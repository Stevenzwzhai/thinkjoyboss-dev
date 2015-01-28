// lazyload config

App
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['lib/vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['lib/vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['lib/vendor/jquery/charts/flot/jquery.flot.min.js', 
                          'lib/vendor/jquery/charts/flot/jquery.flot.resize.js',
                          'lib/vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'lib/vendor/jquery/charts/flot/jquery.flot.spline.js',
                          'lib/vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          'lib/vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['lib/vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['lib/vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['lib/vendor/jquery/nestable/jquery.nestable.js',
                          'lib/vendor/jquery/nestable/nestable.css'],
      filestyle:      ['lib/vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['lib/vendor/jquery/slider/bootstrap-slider.js',
                          'lib/vendor/jquery/slider/slider.css'],
      chosen:         ['lib/vendor/jquery/chosen/chosen.jquery.min.js',
                          'lib/vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['lib/vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'lib/vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['lib/vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'lib/vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['lib/vendor/jquery/datatables/jquery.dataTables.min.js',
                          'lib/vendor/jquery/datatables/dataTables.bootstrap.js',
                          'lib/vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['lib/vendor/jquery/jvectormap/jquery-jvectormap.min.js', 
                          'lib/vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'lib/vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'lib/vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['lib/vendor/jquery/footable/footable.all.min.js',
                          'lib/vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      'lib/vendor/modules/ng-grid/ng-grid.min.js',
                      'lib/vendor/modules/ng-grid/ng-grid.min.css',
                      'lib/vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      'lib/vendor/modules/angular-ui-select/select.min.js',
                      'lib/vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    'lib/vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['lib/vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      'lib/vendor/modules/ngImgCrop/ng-img-crop.js',
                      'lib/vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'lib/vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      'lib/vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      'lib/vendor/modules/angularjs-toaster/toaster.js',
                      'lib/vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'lib/vendor/modules/textAngular/textAngular-sanitize.min.js',
                      'lib/vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      'lib/vendor/modules/angular-slider/angular-slider.min.js',
                      'lib/vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      'lib/vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      'lib/vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      'lib/vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      'lib/vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      'lib/vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      'lib/vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }

          ]
      });
  }])
;