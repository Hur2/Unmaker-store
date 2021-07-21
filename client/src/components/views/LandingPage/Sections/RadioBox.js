import React, { useState } from 'react'
import { Collapse, Checkbox, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {

    const [Value, setValue] = useState(1);

    const handleChange = e => {
        setValue(e.target.value);
        props.handleFilters(e.target.value);
    };

    const renderRadioBoxLists = () => (
        props.list && props.list.map((value, index) => (
            <Radio value={value._id} key={index}>
                {value.name}
            </Radio>
    )))

    return (
        <div>
            <Collapse accordion>
                <Panel header="가격" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBoxLists()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
