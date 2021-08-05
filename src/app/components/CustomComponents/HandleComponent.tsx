import React from 'react';
import { NodeType } from '@models/enumTypes';
import { Handle, Position } from 'react-flow-renderer';

interface HandleComponentProps {
    data: any;
    isConnectable: any;
}

export const HandleComponent = ({ data, isConnectable } : HandleComponentProps) => {
  const onConnect = (params: any) => {
    data.onConnect({from: params.source, to: params.target, label: params.sourceHandle});
  }

  return (
    <>
    {data.type !== NodeType[NodeType.Start] &&
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#F55E46', width: '10px', height: '10px' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    }
    {data.type !== NodeType[NodeType.Decision] && data.type !== NodeType[NodeType.End] &&
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#37ABFE', width: '10px', height: '10px' }}
        onConnect={(params) => onConnect(params)}
        isConnectable={isConnectable}
      />
    }
    {data.type === NodeType[NodeType.Decision] &&
    <>
        <Handle
            id="yes"
            type="source"
            position={Position.Right}
            style={{ top: 40, background: '#23dda5', width: '10px', height: '10px' }}
            onConnect={(params) => onConnect(params)}
            isConnectable={isConnectable}
        />
        <Handle
            id="no"
            type="source"
            position={Position.Right}
            style={{ top: 70, background: '#ffaa5b', width: '10px', height: '10px' }}
            onConnect={(params) => onConnect(params)}
            isConnectable={isConnectable}
        />
    </>
    }
    </>
  );
}