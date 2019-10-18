import {Grid} from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
//License goes here
import {LicenseManager} from "ag-grid-enterprise";
var dbConfig = require('../dbconfig');

LicenseManager.setLicenseKey(dbConfig.license);

const gridOptions = {

    rowModelType: 'serverSide',
    floatingFilter: 'true',
    animateRows:'true',
    

    columnDefs: [
        {field: 'ATHLETE', filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'COUNTRY',filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'SPORT',filter: 'agTextColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'YEAR', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}},
        {field: 'GOLD', filter: 'agNumberColumnFilter', filterParams: {newRowsAction: 'keep'}, aggFunc: 'sum'},
        {field: 'SILVER', aggFunc: 'sum'},
        {field: 'BRONZE', aggFunc: 'sum'},
    ],

    defaultColDef: {
        sortable: true,
        floatingFilter: true,
    },
    // debug: true,
    // cacheBlockSize: 20,
    // maxBlocksInCache: 3,
    // purgeClosedRowNodes: true,
    // maxConcurrentDatasourceRequests: 2,
    // blockLoadDebounceMillis: 1000
};

const gridDiv = document.querySelector('#myGrid');
new Grid(gridDiv, gridOptions);

const datasource = {
    getRows(params) {
         console.log(JSON.stringify(params.request, null, 1));

         fetch('./data/', {
             method: 'post',
             body: JSON.stringify(params.request),
             headers: {"Content-Type": "application/json; charset=utf-8"}
         })
         .then(httpResponse => httpResponse.json())
         .then(response => {
             params.successCallback(response.rows, response.lastRow);
         })
         .catch(error => {
             console.error(error);
             params.failCallback();
         })
    }
};

gridOptions.api.setServerSideDatasource(datasource);
