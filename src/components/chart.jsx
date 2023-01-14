import chartData from '../JSON/data.json'
import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3';
import '../App.css' 
import { extent, max, scaleLinear, line, svg } from 'd3';

export const Chart = ()=>{

    const w = 500;
    const h = 200;
    const [idArr, setIdArr] = useState([])
    const [colorList] = useState(['red','green','blue','grey'])
    const [colorIndex, setColorIndex] =  useState(0)

    const changeColor = () =>{
        setColorIndex( i=> i+1)
        console.log(colorIndex)
        if(colorIndex==colorList.length-1){
            setColorIndex(0)
        }
    }

    let data = [];
    let yData = [];

    chartData.map((el)=>{
        yData.push(el.x)
        data.push(el.y)
    })

    const svgRef = useRef();

    useEffect(()=>{

        const margin =  {top: 0, right: 0, bottom: 0, left: 0};
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style('background', `${colorList[colorIndex]}`)
            .style('margin-top', '50')
            .style('overflow', 'visible')
            .style('box-shadow', '1px 1px 0px 0px rgba(0, 0, 0, 1)')
            .style('transition', '0.5s')


        svg.selectAll(".circle-point")
            .data(chartData)
            .join("circle") 
                .attr("id", d=>d.id)
                    .attr("class", "circle-point")
                    .attr("fill", "purple")
                    .attr("z-index", "20")
                    .attr("r", "4") 
                    .attr("cx", d=> xScale(d.x))   
                    .attr("cy", d=> yScale(d.y))
                    .on('mouseover', function (i, d) {
                        d3.select(this).attr("r", '5')                    
                    })
                    .on('mouseleave', function (i, d) {
                        d3.select(this).attr("r", '4')                    
                    })
                    .on("click", function(i , d) {
                        console.log(i)
                        console.log(d)
                        if(idArr.includes(d)){
                            deleteArr(d)
                            d3.select(this).style("fill", 'purple')
                        }
                        else{
                            const newArr = [...idArr, d]
                            setIdArr(newArr)
                            d3.select(this).style("fill", 'yellow')
                        }
                        console.log('idArr: ', idArr)
                    })

        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat( i => i )

        const yAxis = d3.axisLeft(yScale)
            .tickSizeInner(-w)

        svg.append('g')
            .call((xAxis).ticks(data.length).tickSizeInner(-h)) 
            .attr('transform', `translate(0, ${h})`)
            .attr("z-index", '1')
            .attr("class", "xAxis")

        svg.append('g')
            .call(yAxis)     
            .attr("z-index", '1')

    }, [data])


    const deleteArr = (id) =>{
        const newArr = idArr.filter((arr)=> arr !== id)
        console.log(newArr)
        setIdArr(newArr);
      }

    const lineGenerator = d3.line() 
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))

    const xValue = d => d.x;
    const yValue = d => d.y;
  
    const xScale = d3.scaleLinear()        
          .domain([0, 160])
          .domain([0, (max(chartData, d=>d.x))+10])
          .range([0, w])                   
    const yScale = d3.scaleLinear()
        .domain([0, (max(chartData, d=>d.y)*2)])
        .range([h, max(chartData, d=>d.y)])

    return(
        <div>
            <div className='container'>
                <div className='chart'>
                    <svg ref={svgRef}>
                        <path className='chart-line' d={lineGenerator(chartData)} />
                    </svg>
                    <button onClick={changeColor}>
                        CHANGE COLOR                    
                    </button>
                </div>
 
                <div className='tooltip'>
                {
                    idArr.map((el)=>
                    <div className='el-info' value={el} onClick={()=>deleteArr(el)}>
                        <div className='items-left'>
                            <p>X:</p>
                            <p>Y:</p>
                            <p>Target:</p>
                            <p>Prediction:</p>
                            <p>Group ID:</p>
                        </div>
                        <div className='items-right'>
                            <p>{el.x}</p>
                            <p>{el.y}</p>
                            <p>{el.target}</p>
                            <p>{el.prediction}</p>
                            <p>{el.diagnosisGroupId}</p>
                        </div>
                    </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}