webpackHotUpdate(0,{

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c('div', {\n    staticClass: \"hello\"\n  }, [_c('div', {\n    staticClass: \"filter\"\n  }, [_c('p', [_vm._v(\"Sort by :\")]), _vm._v(\" \"), _c('select', {\n    directives: [{\n      name: \"model\",\n      rawName: \"v-model\",\n      value: (_vm.selectedFilter),\n      expression: \"selectedFilter\"\n    }],\n    attrs: {\n      \"name\": \"filter\"\n    },\n    on: {\n      \"change\": function($event) {\n        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {\n          return o.selected\n        }).map(function(o) {\n          var val = \"_value\" in o ? o._value : o.value;\n          return val\n        });\n        _vm.selectedFilter = $event.target.multiple ? $$selectedVal : $$selectedVal[0]\n      }\n    }\n  }, _vm._l((_vm.filters), function(filter) {\n    return _c('option', {\n      domProps: {\n        \"value\": filter.value\n      }\n    }, [_vm._v(_vm._s(filter.text))])\n  }))]), _vm._v(\" \"), _c('ul', _vm._l((_vm.paginated), function(specie) {\n    return _c('specieListItem', {\n      key: specie.scientificDisplayNme,\n      staticClass: \"specie-li\",\n      attrs: {\n        \"commonName\": specie.commonName,\n        \"conservationStatus\": specie.conservationStatus,\n        \"scientificName\": specie.scientificDisplayName,\n        \"taxonId\": specie.taxonId,\n        \"lastRecord\": specie.lastRecord,\n        \"observationsCount\": specie.count\n      }\n    })\n  })), _vm._v(\" \"), _c('ul', {\n    staticClass: \"pagination\"\n  }, _vm._l((_vm.totalPages), function(pageNumber) {\n    return (Math.abs(pageNumber - _vm.currentPage) < 2 || pageNumber == _vm.totalPages || pageNumber == 1) ? _c('li', [_c('button', {\n      class: {\n        current: _vm.currentPage === pageNumber, last: (pageNumber == _vm.totalPages && Math.abs(pageNumber - _vm.currentPage) > 2), first: (pageNumber == 1 && Math.abs(pageNumber - _vm.currentPage) > 2)\n      },\n      attrs: {\n        \"href\": \"#\"\n      },\n      on: {\n        \"click\": function($event) {\n          _vm.setPage(pageNumber)\n        }\n      }\n    }, [_vm._v(_vm._s(pageNumber))])]) : _vm._e()\n  }))])\n},staticRenderFns: []}\nmodule.exports.render._withStripped = true\nif (true) {\n  module.hot.accept()\n  if (module.hot.data) {\n     __webpack_require__(0).rerender(\"data-v-208fa734\", module.exports)\n  }\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTcyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL1NwZWNpZXMudnVlPzQ4MTEiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwiaGVsbG9cIlxuICB9LCBbX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJmaWx0ZXJcIlxuICB9LCBbX2MoJ3AnLCBbX3ZtLl92KFwiU29ydCBieSA6XCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdzZWxlY3QnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwibW9kZWxcIixcbiAgICAgIHJhd05hbWU6IFwidi1tb2RlbFwiLFxuICAgICAgdmFsdWU6IChfdm0uc2VsZWN0ZWRGaWx0ZXIpLFxuICAgICAgZXhwcmVzc2lvbjogXCJzZWxlY3RlZEZpbHRlclwiXG4gICAgfV0sXG4gICAgYXR0cnM6IHtcbiAgICAgIFwibmFtZVwiOiBcImZpbHRlclwiXG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgXCJjaGFuZ2VcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIHZhciAkJHNlbGVjdGVkVmFsID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKCRldmVudC50YXJnZXQub3B0aW9ucywgZnVuY3Rpb24obykge1xuICAgICAgICAgIHJldHVybiBvLnNlbGVjdGVkXG4gICAgICAgIH0pLm1hcChmdW5jdGlvbihvKSB7XG4gICAgICAgICAgdmFyIHZhbCA9IFwiX3ZhbHVlXCIgaW4gbyA/IG8uX3ZhbHVlIDogby52YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgIH0pO1xuICAgICAgICBfdm0uc2VsZWN0ZWRGaWx0ZXIgPSAkZXZlbnQudGFyZ2V0Lm11bHRpcGxlID8gJCRzZWxlY3RlZFZhbCA6ICQkc2VsZWN0ZWRWYWxbMF1cbiAgICAgIH1cbiAgICB9XG4gIH0sIF92bS5fbCgoX3ZtLmZpbHRlcnMpLCBmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICByZXR1cm4gX2MoJ29wdGlvbicsIHtcbiAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgIFwidmFsdWVcIjogZmlsdGVyLnZhbHVlXG4gICAgICB9XG4gICAgfSwgW192bS5fdihfdm0uX3MoZmlsdGVyLnRleHQpKV0pXG4gIH0pKV0pLCBfdm0uX3YoXCIgXCIpLCBfYygndWwnLCBfdm0uX2woKF92bS5wYWdpbmF0ZWQpLCBmdW5jdGlvbihzcGVjaWUpIHtcbiAgICByZXR1cm4gX2MoJ3NwZWNpZUxpc3RJdGVtJywge1xuICAgICAga2V5OiBzcGVjaWUuc2NpZW50aWZpY0Rpc3BsYXlObWUsXG4gICAgICBzdGF0aWNDbGFzczogXCJzcGVjaWUtbGlcIixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwiY29tbW9uTmFtZVwiOiBzcGVjaWUuY29tbW9uTmFtZSxcbiAgICAgICAgXCJjb25zZXJ2YXRpb25TdGF0dXNcIjogc3BlY2llLmNvbnNlcnZhdGlvblN0YXR1cyxcbiAgICAgICAgXCJzY2llbnRpZmljTmFtZVwiOiBzcGVjaWUuc2NpZW50aWZpY0Rpc3BsYXlOYW1lLFxuICAgICAgICBcInRheG9uSWRcIjogc3BlY2llLnRheG9uSWQsXG4gICAgICAgIFwibGFzdFJlY29yZFwiOiBzcGVjaWUubGFzdFJlY29yZCxcbiAgICAgICAgXCJvYnNlcnZhdGlvbnNDb3VudFwiOiBzcGVjaWUuY291bnRcbiAgICAgIH1cbiAgICB9KVxuICB9KSksIF92bS5fdihcIiBcIiksIF9jKCd1bCcsIHtcbiAgICBzdGF0aWNDbGFzczogXCJwYWdpbmF0aW9uXCJcbiAgfSwgX3ZtLl9sKChfdm0udG90YWxQYWdlcyksIGZ1bmN0aW9uKHBhZ2VOdW1iZXIpIHtcbiAgICByZXR1cm4gKE1hdGguYWJzKHBhZ2VOdW1iZXIgLSBfdm0uY3VycmVudFBhZ2UpIDwgMiB8fCBwYWdlTnVtYmVyID09IF92bS50b3RhbFBhZ2VzIHx8IHBhZ2VOdW1iZXIgPT0gMSkgPyBfYygnbGknLCBbX2MoJ2J1dHRvbicsIHtcbiAgICAgIGNsYXNzOiB7XG4gICAgICAgIGN1cnJlbnQ6IF92bS5jdXJyZW50UGFnZSA9PT0gcGFnZU51bWJlciwgbGFzdDogKHBhZ2VOdW1iZXIgPT0gX3ZtLnRvdGFsUGFnZXMgJiYgTWF0aC5hYnMocGFnZU51bWJlciAtIF92bS5jdXJyZW50UGFnZSkgPiAyKSwgZmlyc3Q6IChwYWdlTnVtYmVyID09IDEgJiYgTWF0aC5hYnMocGFnZU51bWJlciAtIF92bS5jdXJyZW50UGFnZSkgPiAyKVxuICAgICAgfSxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIFwiaHJlZlwiOiBcIiNcIlxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIFwiY2xpY2tcIjogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgX3ZtLnNldFBhZ2UocGFnZU51bWJlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIFtfdm0uX3YoX3ZtLl9zKHBhZ2VOdW1iZXIpKV0pXSkgOiBfdm0uX2UoKVxuICB9KSldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi0yMDhmYTczNFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTIwOGZhNzM0XCJ9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zcmMvdmlld3MvU3BlY2llcy52dWVcbi8vIG1vZHVsZSBpZCA9IDE3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9");

/***/ })

})