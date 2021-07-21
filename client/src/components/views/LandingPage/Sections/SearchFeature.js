import React, { useState } from 'react'
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState('')

    const searchHandler = e => {
        setSearchTerm(e.currentTarget.value)
        props.refreshFunction(e.currentTarget.value)
    }

    return (
        <div>
            <Search 
                placeholder="제품명 입력"
                value={SearchTerm}
                onChange={searchHandler}
                style={{ width: 200 }} 
            />
        </div>
    )
}

export default SearchFeature
