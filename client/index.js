import { Grid } from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
//License goes here
import { LicenseManager } from "ag-grid-enterprise";
var dbConfig = require('../dbconfig');
const applink = dbConfig.applink;

LicenseManager.setLicenseKey(dbConfig.license);

const gridOptions = {

    rowModelType: 'serverSide',
    floatingFilter: 'true',
    animateRows: 'true',

    columnDefs: [
        {
            field: 'ACCNUMBER',
            cellRenderer: function (params) {
                if (params.value !== undefined) {
                    return '<a  href=' + applink + '/activitylog?accnumber=' + params.value + '&custnumber=' + (params.value).substring(5, 12) + '&sys=collections target="_blank">' + params.value + '</a>';
                } else {
                    return '<img src="assets/img/user/loading.gif">';
                }
            },
            filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
        },
        { field: 'CLIENT_NAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        { field: 'CUSTNUMBER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        { field: 'BUCKET', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        { field: 'PRODUCTCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        { field: 'DAYSINARR', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        {
            field: 'OUSTBALANCE',
            cellRenderer: function (params) {
                if (params.value !== undefined) {
                    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                } else {
                    return ''
                }
            },
            filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, aggFunc: 'sum', resizable: true
        },
        {
            field: 'PRINCARREARS',
            cellRenderer: function (params) {
                if (params.value !== undefined) {
                    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                } else {
                    return ''
                }
            },
            filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
        },
        {
            field: 'INSTAMOUNT',
            cellRenderer: function (params) {
                if (params.value !== undefined) {
                    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                } else {
                    return ''
                }
            },
            filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true
        },
        { field: 'LIMITAMOUNT', filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        {
            field: 'TOTALARREARS',
            cellRenderer: function (params) {
                if (params.value !== undefined) {
                    return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                } else {
                    return ''
                }
            },
            filter: 'agNumberColumnFilter', filterParams: { newRowsAction: 'keep' }
        },
        { field: 'RROCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        { field: 'BRANCHCODE', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        { field: 'BRANCHNAME', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
        { field: 'COLOFFICER', filter: 'agTextColumnFilter', filterParams: { newRowsAction: 'keep' }, resizable: true },
    ],

    defaultColDef: {
        sortable: true,
        floatingFilter: true,
        resizable: true
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

        fetch('./viewall/', {
            method: 'post',
            body: JSON.stringify(params.request),
            headers: { "Content-Type": "application/json; charset=utf-8" }
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

function onRowDoubleClicked(event) {
    this.model = event.node.data;
    console.log(this.model);
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/activitylog?accnumber=' + this.model.ACCNUMBER + '&custnumber=' + this.model.CUSTNUMBER + '&username=' + this.currentUser.USERNAME + '&sys=collections', '_blank');
}

function currencyFormatter(params) {
    if (params.value !== undefined) {
        return (Math.floor(params.value * 100) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
        return ''
    }
}

