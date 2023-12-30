import Accordion from 'react-bootstrap/Accordion';

import React from 'react'

function FoldUnfold(props) {
    return (
        <Accordion className='accordion-color'>
            <Accordion.Item className='accordion-color' eventKey="0" >
                <Accordion.Header>
                    <div style={{ color: 'white' }}>{props.title}</div></Accordion.Header>
                <Accordion.Body >
                    {props.text}

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default FoldUnfold
