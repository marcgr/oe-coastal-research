require([
    "esri/layers/FeatureLayer",
    "esri/dijit/FeatureTable",
    "esri/dijit/Search",
    "esri/dijit/HomeButton",
    "esri/dijit/BasemapLayer", "esri/dijit/Basemap",
    "esri/dijit/BasemapGallery",
    "esri/geometry/Extent",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/map",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/number",
    "dojo/parser",
    "dojo/ready",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/io-query",
    "dijit/registry",
    "dijit/form/Button",
    "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer",
    "dijit/form/TextBox",
    "esri/graphicsUtils",
    "esri/tasks/query",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol"
], function (
    FeatureLayer, FeatureTable, Search, HomeButton, BasemapLayer, Basemap, BasemapGallery, Extent, SimpleMarkerSymbol, SimpleLineSymbol, Color, Map,
    domConstruct, dom, dojoNum, parser, ready, on, lang, ioQuery,
    registry, Button, ContentPane, BorderContainer, TextBox, gracphiUtils, Query
) {

    parser.parse();

    ready(function () {

        var uri = window.location.href;
        var query = uri.substring(uri.indexOf("?") + 1, uri.length);
        var queryObject = ioQuery.queryToObject(query);

        var viewType = queryObject.view ? queryObject.view : 'compact';

        if (viewType === 'compact') {
            var topPanel = dijit.byId('top');
            dijit.byId('container').removeChild(topPanel);
            //window.setTimeout(function () {
            //    var topPanel = dijit.byId('topPanel');
            //    dijit.byId('container').removeChild(topPanel);
            //    //dojo.byId('top').style.display = viewType === 'full' ? 'block' : 'none';
            //}, 500);
        } else {
            //hide full screen button
            dojo.byId('Fullscreen').style.display = 'none';
        }


        var coastal_research_fs_url = "https://services.arcgis.com/uUvqNMGPm7axC2dD/arcgis/rest/services/survey123_ffd27bbc80b544198433b60a5a33d710_fieldworker/FeatureServer/0";

        var USGSNatMapLayer = new BasemapLayer({
            url: "http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer"
        });
        var USGSNatMapBasemap = new Basemap({
            layers: [USGSNatMapLayer],
            title: "USGS National Map",
            thumbnailUrl: "http://www.arcgis.com/sharing/rest/content/items/6d9fa6d159ae4a1f80b9e296ed300767/info/thumbnail/national_map.jpg"
        });
        var map = new Map("map", {
            //basemap: "dark-gray",
            basemap: USGSNatMapBasemap,
            center: [-122.45, 45], // longitude, latitude
            zoom: 4
        });

        var featureTable;
        var featureLayer;

        var field_infos = [
                    {
                        name: "field_8",
                        alias: "Research Project Title",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_1",
                        alias: "Name",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_2",
                        alias: "Email Address",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_3",
                        alias: "Phone Number",
                        format: {
                            template: "${value}"
                        },
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_4",
                        alias: "Institution",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_4_other",
                        alias: "Other - Institution",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_5",
                        alias: "Department",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_9",
                        alias: "Personal Research Category(s)",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_6",
                        alias: "Project research category(s)",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_10",
                        alias: "Project status",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_11",
                        alias: "Project start date",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_12",
                        alias: "Project end date",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_13",
                        alias: "Funding Source(s)",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_13_other",
                        alias: "Other - Funding Source(s)",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_14",
                        alias: "Affiliations and Partnerships",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_15",
                        alias: "Principle Investigator",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_16",
                        alias: "Data Manager",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_17",
                        alias: "Research description",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_18",
                        alias: "Data availability",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_18_other",
                        alias: "Other - Data availability",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_19",
                        alias: "URL for accessible research",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_20",
                        alias: "Future plans for availability",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_20_other",
                        alias: "Yes, explain - Future plans for availability",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_22",
                        alias: "Status of data collection.",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_22_other",
                        alias: "Other - Status of data collection.",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_24",
                        alias: "Type of Data",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_25",
                        alias: "Data Description",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_26",
                        alias: "Type of technologies used",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_26_other",
                        alias: "Other - Type of technologies used",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_27",
                        alias: "Technology description",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_28",
                        alias: "Associated metadata or a description of associated data",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_32",
                        alias: "Geographic area description",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_33",
                        alias: "Geographic type measured ",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_33_other",
                        alias: "Other - Geographic type measured ",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_36",
                        alias: "Additional information associated with this project.",
                        showTable: true,
                        showDetails: true
                    }, {
                        name: "field_35",
                        alias: "Please suggest other researchers to include in this network.",
                        showTable: true,
                        showDetails: true
                    }];

        map.on("load", loadMapTableWidgets);


        function loadMapTableWidgets() {

            ////////////////////////////////////
            // Home Button
            ////////////////////////////////////

            var home = new HomeButton({
                map: map
            }, "HomeButton");
            home.startup();

            ////////////////////////////////////
            // Full screen
            ////////////////////////////////////
            var fullscreen = document.getElementById('Fullscreen');
            on(fullscreen, 'click', function (e) {
                window.open('index.html?view=full', '_blank');
            });

            ////////////////////////////////////
            // Basemap Gallery
            ////////////////////////////////////
            //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map
            }, "basemapGallery");
            basemapGallery.startup();

            basemapGallery.on("error", function (msg) {
                console.log("basemap gallery error:  ", msg);
            });


            ///////////////////////////////////
            // Feature Layer
            ///////////////////////////////////
            featureLayer = new FeatureLayer(coastal_research_fs_url, {
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"],
                visible: true,
                id: "fLayer"
            });
            featureLayer.setDefinitionExpression("field_1 <> 'Test 1'");

            featureLayer.syncSelection = true;

            // set a selection symbol for the featurelayer

            var line = new SimpleLineSymbol();
            line.setColor(new Color([0, 255, 197, 1]));
            line.setWidth(5);
            var marker = new SimpleMarkerSymbol();
            //marker.setColor(new Color([0, 0, 0, 0]));
            marker.setOutline(line);
            marker.setAngle(360);

            //var selectionSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            //    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 197, 1])));
            featureLayer.setSelectionSymbol(marker);

            map.addLayer(featureLayer);

            ///////////////////////////////////
            // Feature Layer Events
            ///////////////////////////////////

            featureLayer.on("click", function (evt) {
                var idProperty = featureLayer.objectIdField,
                  feature,
                  featureId,
                  query;

                if (evt.graphic && evt.graphic.attributes && evt.graphic.attributes[idProperty]) {
                    feature = evt.graphic,
                    featureId = feature.attributes[idProperty];

                    showProjectDetails(feature.attributes);

                    query = new Query();
                    query.returnGeometry = false;
                    query.objectIds = [featureId];
                    query.where = "1=1";

                    featureLayer.selectFeatures(query, FeatureLayer.SELECTION_NEW);
                }
            });
            ///////////////////////////////////
            // Feature Table
            ///////////////////////////////////

            // create new FeatureTable and set its properties
            featureTable = new FeatureTable({
                featureLayer: featureLayer,
                map: map,
                showAttachments: false,
                // only allows selection from the table to the map
                syncSelection: true,
                zoomToSelection: true,
                gridOptions: {
                    allowSelectAll: true,
                    allowTextSelection: true,
                },
                dateOptions: {
                    // set date options at the feature table level
                    // all date fields will adhere this
                    datePattern: "MMMM d, y"
                },
                // define order of available fields. If the fields are not listed in 'outFields'
                // then they will not be available when the table starts.
                outFields: ["field_8", "field_2", "field_3", "field_4", 'field_5',
                    "field_6", "field_7", "field_1", "field_9", "field_10"
                ],
                // use fieldInfos property to change field's label (column header),
                // the editability of the field, and to format how field values are displayed
                fieldInfos: field_infos,
                menuFunctions: [
            //Add new Export to CSV menu function
            { label: "Export to CSV", callback: customExportCSV }
                ]
            }, 'featureTableNode');
            featureTable.startup();

            ///////////////////////////////////
            // Feature Table Events
            ///////////////////////////////////

            featureTable.on('load', function (evt) {
                window.setTimeout(function () {
                    dojo.byId('filteredProjects').innerHTML = featureTable.dataStore.totalCount;
                    featureTable.featureLayer.name = 'Research Projects';
                    //featureTable.refresh();
                }, 500);
            });

            featureTable.on("row-select", function (evt) {
                if (evt.rows.length > 0) {
                    showProjectDetails(evt.rows[0].data);
                }
            });

            featureTable.on("row-deselect", function (evt) {
                document.getElementById('detail-wrapper').style.display = 'none';
                document.getElementById('no-selection-wrapper').style.display = 'block';
            });

            ////////////////////////////////////
            // Search
            ////////////////////////////////////
            var search = new Search({
                enableButtonMode: false, //this enables the search widget to display as a single button
                enableLabel: false,
                enableInfoWindow: true,
                showInfoWindowOnSelect: true,
                sources: [],
                map: map
            }, "search");

            var sources = search.get("sources");

            //Push the sources used to search, by default the ArcGIS Online World geocoder is included. In addition there is a feature layer of US congressional districts. The districts search is set up to find the "DISTRICTID". Also, a feature layer of senator information is set up to find based on the senator name.

            sources.push({
                featureLayer: featureLayer,
                searchFields: ["field_8", "field_9", "field_10"],
                displayField: "field_8",
                exactMatch: false,
                outFields: ["field_8"],
                name: "Research Project",
                placeholder: "Search research projects",
                maxResults: 6,
                maxSuggestions: 6,

                //Create an InfoTemplate and include three fields
                enableSuggestions: true,
                minCharacters: 0
            });

            //Set the sources above to the search widget
            search.set("sources", sources);

            search.startup();

            on(search, 'select-result', function (e) {
                //featureTable.dataStore;
                let row_idx;
                featureTable.dataStore.data.forEach(function (row, idx) {
                    row_idx = row.attributes['field_8'] === e.result.feature.attributes['field_8'] ? idx : row_idx;
                })
                featureTable.selectRows(row_idx, true);
                console.log('selected result', e);
            });

            ////////////////////////////////////
            // Filter
            ////////////////////////////////////
            var filter = document.getElementById('filter-select');
            on(filter, 'change', function (e) {
                //featureTable.dataStore;
                var selectedVal = e.srcElement
                    ? e.srcElement.value
                    : e.target
                        ? e.target.value
                         : '';
                var userVal = selectedVal === 'All' ? '' : selectedVal.replace(/\ /g, '_');
                dojo.byId('selectedFilter').innerHTML = selectedVal === 'All' ? 'All Project Research Categories' : selectedVal;
                var oidFld = featureLayer.objectIdField;
                var query = new Query();
                var where = "field_1 <> 'Test 1'" + (userVal === '' ? '' : " AND field_6 LIKE '%" + userVal + "%'");
                query.where = where;

                featureLayer.setDefinitionExpression(where);
                featureLayer.queryIds(query, lang.hitch(this, function (objectIds) {
                    dojo.byId('filteredProjects').innerHTML = objectIds.length;
                    featureTable.filterRecordsByIds(objectIds);
                }));

            });

        }

        function showProjectDetails(featureAttributes) {
            document.getElementById('detail-wrapper').style.display = 'block';
            document.getElementById('no-selection-wrapper').style.display = 'none';
            map.setLevel(map.getLevel() >= 8 ? map.getLevel() : 8);
            if (featureAttributes) {
                let detail_obj = {};
                field_infos.forEach(function (field) {
                    if (field.showDetails) {
                        detail_obj[field.alias] = featureAttributes[field.name]
                            ? featureAttributes[field.name].toString().replace(/\_/g, ' ')
                            : null;
                    }
                });
                document.getElementById('detail-proj-title').innerHTML = detail_obj['Research Project Title'];
                document.getElementById('detail-desc').innerHTML = detail_obj['Research description'];
                document.getElementById('detail-categories').innerHTML = detail_obj['Project research category(s)'];
            }
        }

        function customExportCSV(evt) {
            //var gridData = myFeatureTable.selectedRows;
            var data = featureTable.dataStore.data
            var csv = convertArrayOfObjectsToCSV({
                data: data,
                columns: featureTable.columns
            });

            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            var filename = "Exportdata.csv";
            if (window.navigator.msSaveOrOpenBlob) { // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.download = filename;
                document.body.appendChild(a);
                a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access

                document.body.removeChild(a);
            }

            //if (!csv.match(/^data:text\/csv/i)) {
            //    csv = 'data:text/csv;charset=utf-8,' + csv;
            //}

            //var encodedUri = encodeURI(csv);
            //var link = document.createElement('a');
            //link.setAttribute('href', encodedUri);
            //link.setAttribute('download', "Exportdata.csv");
            //link.click();

        }

        function convertArrayOfObjectsToCSV(value) {
            var result, ctr, keys, columnDelimiter, lineDelimiter, data, aliasKeys;

            data = value.data || null;
            if (data == null || !data.length) {
                return null;
            }

            columnDelimiter = value.columnDelimiter || ',';
            lineDelimiter = value.lineDelimiter || '\n';

            keys = value.columns.map(function (c) {
                return c.field;
            });
            aliasKeys = value.columns.map(function (c) {
                return c.label;
            })
            result = '';
            result += aliasKeys.join(columnDelimiter);
            result += lineDelimiter;

            data.forEach(function (item) {
                ctr = 0;
                keys.forEach(function (key) {
                    if (ctr > 0)
                        result += columnDelimiter;
                    result += item.attributes[key];
                    ctr++;
                });
                result += lineDelimiter;
            });

            return result;
        }
    });
});