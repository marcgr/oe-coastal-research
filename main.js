require([
    "esri/layers/FeatureLayer",
    "esri/dijit/FeatureTable",
    "esri/dijit/Search",
    "esri/dijit/HomeButton",
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
    FeatureLayer, FeatureTable, Search, HomeButton, Extent, SimpleMarkerSymbol, SimpleLineSymbol, Color, Map,
    domConstruct, dom, dojoNum, parser, ready, on, lang,
    registry, Button, ContentPane, BorderContainer, TextBox, gracphiUtils, Query
) {

    parser.parse();

    ready(function () {
        var coastal_research_fs_url = "https://services.arcgis.com/uUvqNMGPm7axC2dD/arcgis/rest/services/survey123_ffd27bbc80b544198433b60a5a33d710_fieldworker/FeatureServer/0";

        var map = new Map("map", {
            basemap: "dark-gray",
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
            }, 'featureTableNode');

            featureTable.startup();

            ///////////////////////////////////
            // Feature Table Events
            ///////////////////////////////////

            featureTable.on("row-select", function (evt) {
                if (evt.rows.length > 0) {
                    showProjectDetails(evt.rows[0].data);
                }
            });

            featureTable.on("row-deselect", function (evt) {
                document.getElementById('detail-wrapper').style.display = 'none';
                document.getElementById('no-selection').style.display = 'block';
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
                var userVal = selectedVal.value === 'All' ? '' : selectedVal.replace(/\ /g, '_');
                var oidFld = featureLayer.objectIdField;
                var query = new Query();
                var where = "field_1 <> 'Test 1'" + (userVal === '' ? '' : " AND field_6 LIKE '%" + userVal + "%'");
                query.where = where;

                featureLayer.setDefinitionExpression(where);
                featureLayer.queryIds(query, lang.hitch(this, function (objectIds) {
                    featureTable.filterRecordsByIds(objectIds);
                }));

            });

        }

        function showProjectDetails(featureAttributes) {
            document.getElementById('detail-wrapper').style.display = 'block';
            document.getElementById('no-selection').style.display = 'none';
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


    });

});