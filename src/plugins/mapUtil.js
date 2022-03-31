export const CURRENT_MAP = {
  //地图map对象
  map: {},
  //存储id的数组，用来控制图层
  idArr: [],
  //popup对象
  popupDescription: null,
}
//返回当前map对象
export const getCurrentMap = function () {
  return CURRENT_MAP.map
}
//设置当前map对象
export const setCurrentMap = function (map) {
  CURRENT_MAP.map = map
}
export const createMap = function (divId, mapConfig, showControl) {
  minemap.domainUrl = mapConfig.mapServiceUrl
  minemap.dataDomainUrl = mapConfig.mapDataDomainUrl
  minemap.spriteUrl = mapConfig.mapSpriteUrl
  minemap.serviceUrl = mapConfig.mapServiceUrl
  minemap.key = mapConfig.mapKey
  minemap.solution = mapConfig.solution
  let mapdefaultConfig = {
    container: divId,
    style: mapConfig.style /*底图样式*/,
    center: mapConfig.center /*地图中心点*/,
    zoom: mapConfig.zoom /*地图默认缩放等级*/,
    pitch: mapConfig.pitch /*地图俯仰角度*/,
    maxZoom: mapConfig.maxZoom /*地图最大缩放等级*/,
    minZoom: mapConfig.minZoom /*地图最小缩放等级*/,
    projection: 'MERCATOR',
  }
  CURRENT_MAP.map = new minemap.Map(mapdefaultConfig)
  if (typeof showControl === 'boolean' && showControl) {
    CURRENT_MAP.map.addControl(new minemap.Navigation(), 'bottom-right')
  }
  //添加默认circle图标
  // loadImage('../../static/image/circle.png', 'default_circle')
  // loadImage('../../static/image/line_arrow.png', 'default_arrow')
  // loadImage('../../static/image/loading.gif', 'loading_gif')
  // //loadImage("../../static/image/arrow_right_icon.png","arrow_multi");
  // loadImage('../../static/image/arrow_right2.png', 'arrow_multi')
  return CURRENT_MAP.map
}
//读取icon图片资源
export const loadImage = function (url, name) {
  CURRENT_MAP.map.loadImage(url, function (error, image) {
    if (error) throw error
    if (!CURRENT_MAP.map.hasImage(name)) {
      CURRENT_MAP.map.addImage(name, image)
    }
  })
}
//添加线图层（带箭头的线，第一种实现方式，线和箭头并不完全重合）
export const createLineLayer = function (
  id,
  geoJsonData,
  layout,
  paint,
  arrowOption,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    var layerObj = {
      id: id + '_layer',
      type: 'line',
      source: id + '_source',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
        'border-visibility': 'visible', //是否开启线边框
      },
      paint: {
        'line-color': { type: 'identity', property: 'lineColor' },
        'line-width': { type: 'identity', property: 'lineWidth' },
        'line-opacity': { type: 'identity', property: 'lineOpacity' },
      },
      maxzoom: 22,
    }
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
    //添加线箭头
    if (arrowOption && arrowOption.showArrow) {
      CURRENT_MAP.map.addLayer({
        id: id + '_arrow',
        type: 'symbol',
        source: id + '_source',
        layout: {
          'symbol-spacing': 35, //控制箭头得密集度
          'symbol-placement': 'line',
          'icon-allow-overlap': true,
          'icon-image': arrowOption.arrowIcon
            ? arrowOption.arrowIcon
            : 'arrow_multi',
          'icon-size': arrowOption.arrowSize ? arrowOption.arrowSize : 0.1,
        },
        paint: {
          'icon-color': 'red',
        },
      })
    }
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
    //if(CURRENT_MAP.map.getSource(id+"_arrow"))CURRENT_MAP.map.getSource(id+"_arrow").setData(geoJsonData.data);
  }
}
export const createLineLayerWithText = function (
  id,
  geoJsonData,
  layout,
  paint,
  textLayout,
  textPaint,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    var layerObj = {
      id: id + '_layer',
      type: 'line',
      source: id + '_source',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': { type: 'identity', property: 'lineColor' },
        'line-width': { type: 'identity', property: 'lineWidth' },
        'line-opacity': { type: 'identity', property: 'lineOpacity' },
      },
      minzoom: 3,
      maxzoom: 22,
    }
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
    //添加文字图层
    let textObj = {
      id: id + '_text',
      type: 'symbol',
      source: id + '_source',
      layout: {
        'text-field': '{name}',
        'text-size': 22,
        'symbol-placement': 'line',
      },
      paint: {
        'text-color': '#F8E71C',
        'text-halo-color': '#FFEC00',
        'text-halo-width': 0.2,
      },
      minzoom: 3,
      maxzoom: 22,
    }
    if (textLayout) textObj.layout = textLayout
    if (textPaint) textObj.paint = textPaint
    CURRENT_MAP.map.addLayer(textObj)
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
    //if(CURRENT_MAP.map.getSource(id+"_arrow"))CURRENT_MAP.map.getSource(id+"_arrow").setData(geoJsonData.data);
  }
}
//添加带箭头的线（第二种实现方式，线和箭头完全重合）
export const createLineWithIcon = function (
  id,
  geoJsonData,
  layout,
  paint,
  arrowOption,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    //添加线图层
    var layerObj = {
      id: id + '_layer',
      type: 'line',
      source: id + '_source',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': { type: 'identity', property: 'lineColor' },
        'line-width': { type: 'identity', property: 'lineWidth' },
        'line-opacity': { type: 'identity', property: 'lineOpacity' },
        //"line-pattern":"arrow_multi"
      },
      maxzoom: 22,
    }
    //添加箭头图层
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
    if (arrowOption && arrowOption.showArrow) {
      CURRENT_MAP.map.addLayer({
        id: id + '_arrow',
        type: 'line',
        source: id + '_source',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-width': { type: 'identity', property: 'lineWidth' },
          'line-opacity': { type: 'identity', property: 'lineOpacity' },
          'line-pattern': arrowOption.arrowIcon
            ? arrowOption.arrowIcon
            : 'arrow_multi',
        },
        maxzoom: 22,
      })
    }
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//添加面图层
export const createPolygonLayer = function (
  id,
  geoJsonData,
  layout,
  paint,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    var layerObj = {
      id: id + '_layer',
      type: 'fill',
      source: id + '_source',
      paint: {
        'fill-outline-color': {
          type: 'identity',
          property: 'fillOutlineColor',
        },
        'fill-color': { type: 'identity', property: 'fillColor' },
        'fill-opacity': { type: 'identity', property: 'fillOpacity' },
      },
      maxzoom: 22,
    }
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//添加circle图层
export const createCircleLayer = function (
  id,
  geoJsonData,
  layout,
  paint,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    var layerObj = {
      id: id + '_layer',
      type: 'circle',
      source: id + '_source',
      paint: {
        'circle-radius': 8,
        'circle-color': 'red',
        'circle-blur': 1,
        'circle-opacity': 1,
        'circle-stroke-width': 1,
        'circle-stroke-color': 'blue',
        'circle-stroke-opacity': 0.8,
      },
      maxzoom: 22,
    }
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//添加标记图层
export const createSymbolLayer = function (
  id,
  geoJsonData,
  layout,
  paint,
  icon,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    var layerObj = {
      id: id + '_layer',
      type: 'symbol',
      source: id + '_source',
      layout: {
        'icon-image': icon ? icon : 'default_circle',
        'icon-size': 1,
      },
      maxzoom: 22,
    }
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//添加航线od图层
export const createOdLayer = function (
  id,
  geoJsonData,
  lineLayout,
  linePaint,
  lineFilter,
  moveLayout,
  movePaint,
  moveFilter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    //添加节点图层
    //添加静态线
    var layerLineObj = {
      id: id + '_line_layer',
      type: 'airline',
      source: id + '_source',
      paint: {
        'airline-seg-group': 10,
        'airline-speed': 200,
        'airline-type': 'none',
        'airline-color': {
          property: 'type',
          stops: [
            [1, '#40D3EA'],
            [2, '#6DD400'],
            [3, '#FFB600'],
            [4, '#FE5B02'],
            [5, '#CA0000'],
          ],
        },
        'airline-width': 3,
        'airline-opacity': 0.4,
      },
      minzoom: 1,
      maxzoom: 22,
    }
    if (lineFilter) layerLineObj.filter = lineFilter
    if (lineLayout) layerLineObj.layout = lineLayout
    if (linePaint) layerLineObj.paint = linePaint
    var layerMoveLineObj = {
      id: id + '_move_layer',
      type: 'airline',
      source: id + '_source',
      paint: {
        'airline-seg-group': 10,
        'airline-speed': 200,
        'airline-type': 'history',
        'airline-color': {
          property: 'type',
          stops: [
            [1, '#40D3EA'],
            [2, '#6DD400'],
            [3, '#FFB600'],
            [4, '#FE5B02'],
            [5, '#CA0000'],
          ],
        },
        'airline-width': 3,
        // "airline-opacity": 0.5
      },
      minzoom: 1,
      maxzoom: 22,
    }
    if (moveFilter) layerMoveLineObj.filter = moveFilter
    if (moveLayout) layerMoveLineObj.layout = moveLayout
    if (movePaint) layerMoveLineObj.paint = movePaint
    CURRENT_MAP.map.repaint = true //开启动态地图重绘
    CURRENT_MAP.map.addLayer(layerLineObj)
    CURRENT_MAP.map.addLayer(layerMoveLineObj)
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//创建点聚合
export const ctreatClusterPoint = function (
  id,
  geojsonData,
  outerColors,
  innerColors
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geojsonData)
    //添加非聚合图层
    CURRENT_MAP.map.addLayer({
      id: id + '_unclustered_points',
      type: 'symbol',
      source: id + '_source',
      filter: ['!has', 'point_count'],
      layout: {
        'icon-image': '{iconImage}',
        'icon-size': 0.7,
      },
    })
    //添加聚合图层
    outerColors.forEach(function (color, i) {
      CURRENT_MAP.map.addLayer({
        id: i + '_point_outer_cluster',
        type: 'circle',
        source: id + '_source',
        paint: {
          'circle-color': color[1],
          'circle-radius': 20,
        },
        filter:
          i === 0
            ? ['>=', 'point_count', color[0]]
            : [
                'all',
                ['>=', 'point_count', color[0]],
                ['<', 'point_count', outerColors[i - 1][0]],
              ],
      })
    })

    innerColors.forEach(function (color, i) {
      CURRENT_MAP.map.addLayer({
        id: i + '_point_inner_cluster',
        type: 'circle',
        source: id + '_source',
        paint: {
          'circle-color': color[1],
          'circle-radius': 15,
        },
        filter:
          i === 0
            ? ['>=', 'point_count', color[0]]
            : [
                'all',
                ['>=', 'point_count', color[0]],
                ['<', 'point_count', innerColors[i - 1][0]],
              ],
      })
    })
    //添加数量图层
    CURRENT_MAP.map.addLayer({
      id: 'tp_cluster_count',
      type: 'symbol',
      source: id + '_source',
      layout: {
        'text-field': '{point_count}',
        'text-size': 10,
      },
      // "layout": {
      //   "icon-image": imageIcon,
      //   "icon-size": 0.7,
      //   "text-field": "{point_count}",
      //   "text-size": 12,
      //   "text-offset": [-0.1, -2.3],
      // },
      paint: {
        'text-color': 'rgba(0,0,0,.75)',
      },
      filter: ['has', 'point_count'],
    })
  } else {
    CURRENT_MAP.map.getSource(id + '_source').setData(geojsonData.data)
  }
}

//创建聚合效果
export const createClusterLayer = function (
  id,
  geoJsonData,
  clusterOption,
  originLayerOption,
  clusterLayerOption,
  labelLayerOption
) {
  //设置聚合效果
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    ////设置聚合效果
    geoJsonData.cluster = true
    //显示局和效果的最大zoom
    geoJsonData.clusterMaxZoom = clusterOption[clusterMaxZoom]
      ? clusterOption[clusterMaxZoom]
      : 14
    //聚合与聚合之间的距离
    geoJsonData.clusterRadius = clusterOption[clusterRadius]
      ? clusterOption[clusterRadius]
      : 50
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    //聚合前图层
    var originLayer = {
      id: id + '_layer',
      type: 'symbol',
      source: id + '_source',
      filter: ['!has', 'point_count'],
      layout: {
        'icon-image': 'default_circle',
        'icon-size': 0.6,
      },
      paint: {
        'text-color': '#ffffff',
      },
    }
    if (originLayerOption && originLayerOption.layout)
      originLayer.layout = originLayerOption.layout
    if (originLayerOption && originLayerOption.paint)
      originLayer.paint = originLayerOption.paint
    if (originLayerOption && originLayerOption.filter)
      originLayer.filter = originLayerOption.filter
    CURRENT_MAP.map.addLayer(originLayer)
    //添加聚合
    var clusterLayer = {
      id: id + '_cluster_layer',
      type: 'circle',
      source: id + '_source',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#00a8f3',
          5,
          '#2e2ec5',
          10,
          '#6767b8',
        ],
        'circle-radius': 15,
      },
    }

    if (clusterLayerOption && clusterLayerOption.layout)
      clusterLayer.layout = clusterLayerOption.layout
    if (clusterLayerOption && clusterLayerOption.paint)
      clusterLayer.paint = clusterLayerOption.paint
    CURRENT_MAP.map.addLayer(clusterLayer)
    //添加聚合文字
    var labelLayer = {
      id: id + '_text_layer',
      type: 'symbol',
      source: id + '_source',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 18,
      },
      paint: {
        'text-color': 'white',
      },
    }
    if (labelLayerOption && labelLayerOption.layout)
      labelLayer.layout = labelLayerOption.layout
    if (labelLayerOption && labelLayerOption.paint)
      labelLayer.paint = labelLayerOption.paint
    CURRENT_MAP.map.addLayer(labelLayer)
  } else {
    CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//创建聚合下效果（只有原始图层）
export const createClusterOriginLayer = function (
  id,
  geoJsonData,
  originLayerOption
) {
  //设置聚合效果
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    //聚合前图层
    var originLayer = {
      id: id + '_layer',
      type: 'symbol',
      source: id + '_source',
      filter: ['!has', 'point_count'],
      layout: {
        'icon-image': 'default_circle',
        'icon-size': 0.6,
      },
      paint: {
        'text-color': '#ffffff',
      },
    }
    if (originLayerOption && originLayerOption.layout)
      originLayer.layout = originLayerOption.layout
    if (originLayerOption && originLayerOption.paint)
      originLayer.paint = originLayerOption.paint
    if (originLayerOption && originLayerOption.filter)
      originLayer.filter = originLayerOption.filter
    CURRENT_MAP.map.addLayer(originLayer)
  } else {
    CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//创建热力效果
export const createHeatLayer = function (
  id,
  geoJsonData,
  layout,
  paint,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    var layerObj = {
      id: id + '_layer',
      type: 'heatmap',
      source: id + '_source',
      paint: {
        'heatmap-weight': [
          //设置热值，根据资源中的sum字段进行线性插值
          'interpolate',
          ['linear'],
          ['get', 'hot'], //获取资源feature中的properties中的hot值进行动态生成
          0,
          1,
          10,
          10,
        ],
        'heatmap-intensity': [
          //通过缩放级别调整热图颜色重量权重
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          1,
          20,
          1,
        ],
        'heatmap-color': [
          //设置热力颜色色阶，从外圈到内圈
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)', //透明
          0.2,
          'rgb(62,104,248)', //深蓝
          0.3,
          'rgb(52,251,248)', //淡蓝
          0.4,
          'rgb(199,251,117)', //绿
          0.6,
          'rgb(247, 255, 41)', //黄
          0.7,
          'rgb(255,133,11)', //橙
          0.9,
          'rgb(243,52,34)', //红
          1,
          'rgb(183,30,35)', //深红
        ],
        'heatmap-radius': [
          //通过缩放级别调整热图圆圈点半径
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          6,
          13,
          8,
        ],
        'heatmap-opacity': [
          //通过缩放级别调整热图透明度
          'interpolate',
          ['linear'],
          ['zoom'],
          7,
          0.5,
          20,
          0.7,
        ],
      },
    }
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//创建柱状图
export const createBarLayer = function (
  id,
  geoJsonData,
  layout,
  paint,
  filter
) {
  if (CURRENT_MAP.idArr.indexOf(id) == -1) {
    CURRENT_MAP.idArr.push(id)
    CURRENT_MAP.map.addSource(id + '_source', geoJsonData)
    var layerObj = {
      id: id + '_layer',
      type: 'histogram',
      source: id + '_source',
      layout: {
        'histogram-max-height-render': true /*是否开启柱状图极大高度控制*/,
        'histogram-color-render': true,
      },
      paint: {
        'histogram-colors': [
          'rgb(62,104,248)',
          'rgb(199,251,117)',
          'rgb(247, 255, 41)',
          'rgb(255,133,11)',
          'rgb(183,30,35)',
        ],
        'histogram-max-height': 100,
        'histogram-height': {
          type: 'identity',
          property: 'levels',
        } /*高度*/,
        'histogram-base': 0 /*基础高度*/,
        'histogram-opacity': 0.8,
      },
    }
    if (filter) layerObj.filter = filter
    if (layout) layerObj.layout = layout
    if (paint) layerObj.paint = paint
    CURRENT_MAP.map.addLayer(layerObj)
  } else {
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.getSource(id + '_source').setData(geoJsonData.data)
  }
}
//通过html元素和css样式去创建popup
export const createPopupByHtml = function (popupStr, center) {
  if (CURRENT_MAP.popupDescription) CURRENT_MAP.popupDescription.remove()
  CURRENT_MAP.popupDescription = new minemap.Popup({
    closeOnClick: false,
    offset: [0, -12],
    closeButton: false,
  }).setHTML(popupStr)
  CURRENT_MAP.popupDescription.setLngLat(center)
  CURRENT_MAP.popupDescription.addTo(CURRENT_MAP.map)
}
//删除popup
export const removePopup = function () {
  if (CURRENT_MAP.popupDescription) {
    CURRENT_MAP.popupDescription.remove()
    CURRENT_MAP.popupDescription = null
  }
}
//删除指定的layer
export const removeLayer = function (id) {
  var idIndex = CURRENT_MAP.idArr.indexOf(id)
  if (idIndex == -1) return
  if (CURRENT_MAP.map.getLayer(id + '_arrow'))
    CURRENT_MAP.map.removeLayer(id + '_arrow')
  if (CURRENT_MAP.map.getLayer(id + '_layer'))
    CURRENT_MAP.map.removeLayer(id + '_layer')
  //以下两个图层删除，针对聚合效果的聚合图层和文字图层
  if (CURRENT_MAP.map.getLayer(id + '_text_layer'))
    CURRENT_MAP.map.removeLayer(id + '_text_layer')
  if (CURRENT_MAP.map.getLayer(id + '_cluster_layer'))
    CURRENT_MAP.map.removeLayer(id + '_cluster_layer')
  //od效果图图层
  if (CURRENT_MAP.map.getLayer(id + '_line_layer'))
    CURRENT_MAP.map.removeLayer(id + '_line_layer')
  if (CURRENT_MAP.map.getLayer(id + '_move_layer'))
    CURRENT_MAP.map.removeLayer(id + '_move_layer')
  if (CURRENT_MAP.map.getSource(id + '_source'))
    CURRENT_MAP.map.removeSource(id + '_source')
  CURRENT_MAP.idArr.splice(idIndex, 1)
}
//删除所有的图层
export const removeAllLayer = function () {
  CURRENT_MAP.idArr.forEach(function (id) {
    //针对线箭头
    if (CURRENT_MAP.map.getLayer(id + '_arrow'))
      CURRENT_MAP.map.removeLayer(id + '_arrow')
    if (CURRENT_MAP.map.getLayer(id + '_text'))
      CURRENT_MAP.map.removeLayer(id + '_text')
    if (CURRENT_MAP.map.getLayer(id + '_layer'))
      CURRENT_MAP.map.removeLayer(id + '_layer')
    //以下两个图层删除，针对聚合效果的聚合图层和文字图层
    if (CURRENT_MAP.map.getLayer(id + '_text_layer'))
      CURRENT_MAP.map.removeLayer(id + '_text_layer')
    if (CURRENT_MAP.map.getLayer(id + '_cluster_layer'))
      CURRENT_MAP.map.removeLayer(id + '_cluster_layer')
    //od效果图图层
    if (CURRENT_MAP.map.getLayer(id + '_line_layer'))
      CURRENT_MAP.map.removeLayer(id + '_line_layer')
    if (CURRENT_MAP.map.getLayer(id + '_move_layer'))
      CURRENT_MAP.map.removeLayer(id + '_move_layer')
    if (CURRENT_MAP.map.getSource(id + '_source'))
      CURRENT_MAP.map.removeSource(id + '_source')
  })
  CURRENT_MAP.idArr = []
  //console.log( CURRENT_MAP.idArr);
}
//删除所有添加的图层，包括marker,popup
export const clearAll = function () {
  removeAllLayer()
  removePopup()
}
//自动设置视图缩放
export const setAutoSize = function (coos, padding) {
  let mms = [0, 0, 360, 360] //最大最小经纬度,[maxx,maxy,minx,miny]
  if (coos) {
    for (let ll in coos) {
      //循环经纬度集合找出最大最小经纬度
      if (coos[ll][0] > mms[0]) mms[0] = coos[ll][0] //找到最大经度
      if (coos[ll][0] < mms[2]) mms[2] = coos[ll][0] //找到最小经度
      if (coos[ll][1] > mms[1]) mms[1] = coos[ll][1] //找到最大纬度
      if (coos[ll][1] < mms[3]) mms[3] = coos[ll][1] //找到最小纬度
    }
    let minx = mms[2] - (mms[0] - mms[2]) / 2
    let miny = mms[3] - (mms[1] - mms[3]) / 2
    let maxx = mms[0] + (mms[0] - mms[2]) / 2
    let maxy = mms[1] + (mms[1] - mms[3]) / 2
    let arr = [
      [minx, miny],
      [maxx, maxy],
    ]
    CURRENT_MAP.map.fitBounds(minemap.LngLatBounds.convert(arr), {
      padding: padding ? padding : 0,
    })
  }
}

/**
 *
 * @param type areaGeometry.type的值
 * @param areaGeometry geogson数据
 * @returns {[]} 根据参数返回geojson数据,集合中返回的第一个为线第二个是面
 */
export const createGeojson = function (type, areaGeometry) {
  var list = []
  let geoJsonData = {},
    lineGeoJsonData = {}
  if (
    type != 'MultiPolygon' &&
    type != 'MultiLineString' &&
    type != 'FeatureCollection'
  ) {
    geoJsonData = {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: areaGeometry,
      },
    }
    lineGeoJsonData = {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: areaGeometry.coordinates[0],
        },
      },
    }
  } else if (type == 'MultiLineString') {
    lineGeoJsonData = {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: areaGeometry,
      },
    }
  } else if (type == 'FeatureCollection') {
    geoJsonData = {
      type: 'geojson',
      data: areaGeometry,
    }
    if (areaGeometry.features.length <= 1) {
      lineGeoJsonData = {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: areaGeometry.features[0].geometry.coordinates[0],
          },
        },
      }
    } else {
      lineGeoJsonData = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      }
      for (let i = 0; i < areaGeometry.features.length; i++) {
        var feature = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: areaGeometry.features[i].geometry.coordinates[0],
          },
        }
        lineGeoJsonData.data.features.push(feature)
      }
    }
  } else {
    geoJsonData = {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: areaGeometry,
      },
    }
    lineGeoJsonData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    }
    for (let i = 0; i < areaGeometry.coordinates.length; i++) {
      for (let j = 0; j < areaGeometry.coordinates[i].length; j++) {
        var feature = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: areaGeometry.coordinates[i][j],
          },
        }
        lineGeoJsonData.data.features.push(feature)
      }
    }
  }
  list.push(lineGeoJsonData)
  list.push(geoJsonData)
  return list
}
