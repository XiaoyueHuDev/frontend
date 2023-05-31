import React, { useMemo, } from 'react'
import type {DotProps} from '../bannerType'
import "./index.scss"

 function Index(props:DotProps) {
   
    const { total, curIndex, onChange } = props;
    const renderDotSpan = useMemo(()=>{
        const curNumber=curIndex===total?0:curIndex
        const array =[];
        for (let index = 0; index < total; index++) {

            array.push(<span 
                key={index}
                className={index===curNumber?'active':''} 
                onClick={()=>{
                    onChange(index)
                }}
                />)
            
        }
        return array
    },[total,curIndex,onChange])
    return (
        <div className='dot-container'>
            {renderDotSpan}
        </div>
    )
}

export default Index
