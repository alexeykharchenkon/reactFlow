import { Button } from 'beautiful-react-ui';
import React from 'react';
import { getBezierPath, getEdgeCenter, getMarkerEnd} from 'react-flow-renderer';

const foreignObjectSize = 50;

export const CustomEdge = ({id, label, sourceX, sourceY, targetX, targetY, 
    sourcePosition, targetPosition, style = {}, data, arrowHeadType, markerEndId } : any) => {

  const edgePath = getBezierPath({sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition});
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({sourceX,sourceY,targetX,targetY});

  const onEdgeClick = (evt: any, id: any) => { 
      data.onDelete(id);
    }

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="edgeLabel">
            {label}
            <Button 
                rounded
                outline
                icon="times" 
                size="small" 
                color="danger"
                className="delete_button"
                onClick={(event) => onEdgeClick(event, id)}
            />
        </div>
      </foreignObject>
    </>
  );
}