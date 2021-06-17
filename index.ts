import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

/**
 * Default FlowShape sample
 */

import {
  Diagram,
  NodeModel,
  UndoRedo,
  ConnectorModel,
  PointPortModel,
  SymbolPalette,
  SymbolInfo,
  IDragEnterEventArgs,
  GridlinesModel,
  PaletteModel,
  FlowShapes,
  Node
} from '@syncfusion/ej2-diagrams';
import { addEvents } from './script/diagram-common';
//import { openPalette, closePalette, getClassList } from './styles/html-class';
Diagram.Inject(UndoRedo);

//Create and add ports for node.
function getPorts(): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } }
  ];
  return ports;
}

//Sets the default values of a node
function getNodeDefaults(node: NodeModel): NodeModel {
  let obj: NodeModel = {};
  if (obj.width === undefined) {
    obj.width = 145;
  } else {
    let ratio: number = 100 / obj.width;
    obj.width = 100;
    obj.height *= ratio;
  }
  obj.annotations = [{ style: { color: 'black', fill: 'transparent' } }];
  //Set ports
  obj.ports = getPorts();
  return obj;
}

//Sets the default values of a connector
function getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
  if (obj.id.indexOf('connector') !== -1) {
    obj.type = 'Orthogonal';
    obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
  }
  return obj;
}

function getFlowShape(id: string, shapeType: FlowShapes): NodeModel {
  let flowshape: NodeModel = {
    id: id,
    shape: { type: 'Flow', shape: shapeType }
  };
  return flowshape;
}

function getSymbolDefaults(symbol: NodeModel): void {
  // symbol.style = { strokeColor: '#757575' };
  // if (symbol.id === 'Terminator' || symbol.id === 'Process' || symbol.id === 'Delay') {
  //     symbol.width = 80;
  //     symbol.height = 40;
  // } else if (symbol.id === 'Decision' || symbol.id === 'Document' || symbol.id === 'PreDefinedProcess' ||
  //     symbol.id === 'PaperTap' || symbol.id === 'DirectData' || symbol.id === 'MultiDocument' || symbol.id === 'Data') {
  //     symbol.width = 50;
  //     symbol.height = 40;
  // } else {
  //     symbol.width = 50;
  //     symbol.height = 50;
  // }
}

function getSymbolInfo(symbol: NodeModel): SymbolInfo {
  return { fit: true };
}

// tslint:disable-next-line:max-func-body-length

let bounds: ClientRect = document
  .getElementById('diagram-space')
  .getBoundingClientRect();
let centerX: number = bounds.width / 2;
let interval: number[] = [
  1,
  9,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75
];

let gridlines: GridlinesModel = {
  lineColor: '#e0e0e0',
  lineIntervals: interval
};
// Initializes the nodes for the diagram
let nodes: NodeModel[] = [
  {
    id: 'NewIdea',
    height: 60,
    offsetX: centerX - 50,
    offsetY: 80,
    shape: { type: 'Flow', shape: 'Terminator' },
    annotations: [{ content: 'Place Order' }]
  },
  {
    id: 'Meeting',
    height: 60,
    offsetX: centerX - 50,
    offsetY: 160,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [{ content: 'Start Transaction' }]
  },
  {
    id: 'BoardDecision',
    height: 60,
    offsetX: centerX - 50,
    offsetY: 240,
    shape: { type: 'Flow', shape: 'Process' },
    annotations: [{ content: 'Verification' }]
  },
  {
    id: 'Project',
    height: 60,
    offsetX: centerX - 50,
    offsetY: 330,
    shape: { type: 'Flow', shape: 'Decision' },
    annotations: [{ content: 'Credit card valid?' }]
  },
  {
    id: 'End',
    height: 60,
    offsetX: centerX - 50,
    offsetY: 430,
    shape: { type: 'Flow', shape: 'Decision' },
    annotations: [{ content: 'Funds available?' }]
  }
];

//Initializes the connector for the diagram
let connectors: ConnectorModel[] = [
  { id: 'connector1', sourceID: 'NewIdea', targetID: 'Meeting' },
  { id: 'connector2', sourceID: 'Meeting', targetID: 'BoardDecision' },
  { id: 'connector3', sourceID: 'BoardDecision', targetID: 'Project' },
  {
    id: 'connector4',
    sourceID: 'Project',
    annotations: [{ content: 'Yes', style: { fill: 'white' } }],
    targetID: 'End'
  }
];

//Initializes diagram control
let diagram: Diagram = new Diagram({
  width: '100%',
  height: '700px',
  nodes: nodes,
  connectors: connectors,
  snapSettings: {
    horizontalGridlines: gridlines,
    verticalGridlines: gridlines
  },
  //Sets the default values of a node
  getNodeDefaults: getNodeDefaults,
  //Sets the default values of a connector
  getConnectorDefaults: getConnectorDefaults
});
diagram.appendTo('#diagram');

//Initialize the flowshapes for the symbol palatte
let flowShapes: NodeModel[] = [
  getFlowShape('Terminator', 'Terminator'),
  getFlowShape('Process', 'Process'),
  getFlowShape('Decision', 'Decision'),
  getFlowShape('Document', 'Document'),
  getFlowShape('PreDefinedProcess', 'PreDefinedProcess'),
  getFlowShape('PaperTap', 'PaperTap'),
  getFlowShape('DirectData', 'DirectData'),
  getFlowShape('SequentialData', 'SequentialData'),
  getFlowShape('Sort', 'Sort'),
  getFlowShape('MultiDocument', 'MultiDocument'),
  getFlowShape('Collate', 'Collate'),
  getFlowShape('Or', 'Or'),
  getFlowShape('Extract', 'Extract'),
  getFlowShape('Merge', 'Merge'),
  getFlowShape('OffPageReference', 'OffPageReference')
];

//Initializes connector symbols for the symbol palette
let connectorSymbols: NodeModel[] = [
  {
    id: 'rectangle1',
    offsetX: 100,
    offsetY: 100,
    width: 150,
    height: 100
  },
  {
    id: 'or',
    shape: { type: 'Basic', shape: 'Ellipse' },
    offsetX: 100,
    offsetY: 100,
    width: 60,
    height: 60
  },
  {
    id: 'group1',
    children: ['rectangle1', 'or']
  },
  {
    id: 'or2',
    shape: { type: 'Flow', shape: 'Extract' },
    offsetX: 80,
    offsetY: 50,
    width: 60,
    height: 60
  },
  {
    id: 'group2',
    children: ['rectangle1', 'or2']
  },
  {
    id: 'rectangle3',
    offsetX: 272,
    offsetY: 372,
    width: 150,
    height: 100
  },
  {
    id: 'or3',
    shape: { type: 'Basic', shape: 'Ellipse' },

    offsetX: 272,
    offsetY: 272,
    width: 60,
    height: 60
  },
  {
    id: 'group3',
    children: ['rectangle3', 'or3']
  }
];

let palettes: PaletteModel[] = [
  {
    id: 'flow',
    expanded: true,
    symbols: flowShapes,
    iconCss: 'e-ddb-icons e-flow',
    title: 'My Libary 1'
  },
  {
    id: 'connectors',
    expanded: true,
    symbols: connectorSymbols,
    iconCss: 'e-ddb-icons e-connector',
    title: 'My Libary 2'
  }
];
//Initializes the symbol palette

let palette: SymbolPalette = new SymbolPalette({
  expandMode: 'Multiple',
  palettes: palettes,
  width: '100%',
  height: '700px',
  symbolHeight: 60,
  symbolWidth: 60,
  symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
  getNodeDefaults: getSymbolDefaults,
  getSymbolInfo: getSymbolInfo
});
palette.appendTo('#symbolpalette');

addEvents();
