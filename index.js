import angular from 'angular';
import ngMaterial from 'angular-material';
import ngUiRouter from 'angular-ui-router';
import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ngRedux from 'ng-redux';
import * as CounterActions from './actions/counter';

function counter(state = 0, action) {
  switch (action.type) {
  case CounterActions.INCREMENT_COUNTER:
    return state + 1
  case CounterActions.DECREMENT_COUNTER:
    return state - 1
  default:
    return state
  }
}

const rootReducer = combineReducers({
  counter
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
// let store = createStore(counter)
//
// // You can subscribe to the updates manually, or use bindings to your view layer.
// store.subscribe(() =>
//   console.log(store.getState())
// )
//
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'DECREMENT' })

class AppCtrl {
  constructor($ngRedux, $scope) {
    let unsubscribe = $ngRedux.connect(this.mapStateToThis, CounterActions)(this);
    $scope.$on('$destroy', unsubscribe);

    $scope.run = function() {
      console.log('ran');
    }
  }

  mapStateToThis(state) {
    return {
      value: state.counter
    };
  }
}


angular.module('MyApp', [ngMaterial, ngUiRouter, ngRedux])

.config( ($ngReduxProvider, $stateProvider, $urlRouterProvider) => {

  $ngReduxProvider.createStoreWith(rootReducer, [thunk], [], {counter: 1});

  $urlRouterProvider.otherwise("/state1");
  $stateProvider
    .state('state1', {
      url: "/state1",
      template: `
        <md-content>
          counter.value = {{this.counter.value}}
        </md-content>
        <md-button ng-click="this.run()">click me</md-button>
      `,
      controller: AppCtrl
    })
    .state('state2', {
      url: "/state2",
      template: `state2 here`
    });

})

.controller('AppCtrl', AppCtrl)

.run( () => {
  console.log('started');
})


console.log('testing v1');
