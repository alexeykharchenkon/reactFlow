import { NodeType } from '@models/enumTypes';
import { Button } from 'beautiful-react-ui';
import React from 'react';
import { ConnectPopoverComponent } from './ConnectPopoverComponent';

interface ButtonComponentProps {
    id: string;
    data: any;
}

export const ButtonComponent = ({ id, data } : ButtonComponentProps) => {
  return (
    <>
       {!data.isAFirstElement &&
        <Button 
            icon="times" 
            size="small" 
            color="danger"
            className="delete_button"
            onClick={() => data.onDelete(id)}
        />}
       {data.type !== NodeType[NodeType.End] && data.type !== NodeType[NodeType.Decision] && 
          <ConnectPopoverComponent 
            trigger={<Button icon="plus" size="small" color="primary"/>}
            onConnect={data.onConnect}
            dataForSelect={data.dataForSelect}
            from={id}
            label={""}
          />
        }
          {data.type === NodeType[NodeType.Decision] && 
          <>
            <ConnectPopoverComponent 
              trigger={<Button icon="plus" size="small" color="success"  className="delete_button">yes</Button>}
              onConnect={data.onConnect}
              dataForSelect={data.dataForSelect}
              from={id}
              label={"yes"}
            />
            <ConnectPopoverComponent 
              trigger={<Button icon="plus" size="small" color="warning">no</Button>}
              onConnect={data.onConnect}
              dataForSelect={data.dataForSelect}
              from={id}
              label={"no"}
            />
          </>
        }
        </>
  )
}