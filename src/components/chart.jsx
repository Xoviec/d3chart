import chartData from '../JSON/data.json'
import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3';
import '../App.css' 
import { extent, max, scaleLinear, line, svg } from 'd3';

export const Chart = ()=>{

    const [proba, setProba] = useState(0)
    const [idArr, setIdArr] = useState([])
    const [colorList] = useState(['red','green','blue','grey'])
    const [colorIndex, setColorIndex] =  useState(0)
    const [visibility, setVisibility] = useState(0)


    const changeColor = () =>{
        setColorIndex( i=> i+1)
        console.log(colorIndex)
        if(colorIndex==colorList.length-1){
            setColorIndex(0)
        }
    }


    
    // const [lineGenerator, setLineGenerator] = useState()
    // const [data] = useState([25,50,35,15,94,50])
    // const [chartData] = useState(chartData)
//         [
//   {
//     "id": 1,
//     "x": 10,
//     "y": 0.5,
//     "target": 1,
//     "prediction": 0,
//     "diagnosisGroupId": 1
//   },
//   {
//     "id": 2,
//     "x": 30,
//     "y": 0.52,
//     "target": 0,
//     "prediction": 0,
//     "diagnosisGroupId": 5
//   }, {
//   "id": 3,
//   "x": 50,
//   "y": 0.53,
//   "target": 1,
//   "prediction": 0,
//   "diagnosisGroupId": 5
// }, {
//   "id": 4,
//   "x": 70,
//   "y": 0.6,
//   "target": 1,
//   "prediction": 0,
//   "diagnosisGroupId": 5
// },
//   {
//     "id": 5,
//     "x": 90,
//     "y": 0.7,
//     "target": 0,
//     "prediction": 0,
//     "diagnosisGroupId": 1
//   }, {
//   "id": 6,
//   "x": 110,
//   "y": 0.65,
//   "target": 1,
//   "prediction": 0,
//   "diagnosisGroupId": 5
// }, {
//   "id": 7,
//   "x": 130,
//   "y": 0.75,
//   "target": 1,
//   "prediction": 0,
//   "diagnosisGroupId": 5
// },
//  {
//   "id": 8,
//   "x": 150,
//   "y": 1.2,
//   "target": 1,
//   "prediction": 0,
//   "diagnosisGroupId": 5
// }]

    let data = [];
    let yData = [];


    chartData.map((el)=>{
        yData.push(el.x)
        data.push(el.y)
    })



    const svgRef = useRef();

//     const w = 400;
//     const h = 100;
//     const xScale = d3.scaleLinear()
//     .domain([0, max(chartData, d=>d.x)])
//     .range([0, w])

// const yScale = d3.scaleLinear()
//     .domain([0, h])
//     .range([h, 0])

//     const xValue = d => d.x;
//     const yValue = d => d.y;

//     const lineGenerator = line()
//     .x(d => xScale(xValue(d)))
//     .y(d => yScale(yValue(d)))

    useEffect(()=>{

        const margin =  {top: 0, right: 0, bottom: 0, left: 0};
        // const w = 400;
        // const h = 100;
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style('background', `${colorList[colorIndex]}`)
            .style('margin-top', '50')
            .style('overflow', 'visible')
            .style('box-shadow', '1px 1px 0px 0px rgba(0, 0, 0, 1)')
            .style('transition', '0.5s')


        const xValue = d => d.x;
        const yValue = d => d.y;

        
        //tego nizej nie musi byc chyba w useeffect
    
        // const xScale = d3.scaleLinear()
        //     .domain([0, max(chartData, d=>d.x)])
        //     .range([0, w])

        // const yScale = d3.scaleLinear()
        //     .domain([0, h])
        //     .range([h, 0])

     
    // const lineGenerator = line() //ten jest dobry póki co
    // .x(d => xScale(xValue(d)))
    // .y(d => yScale(yValue(d)))



         
   


    
        // svg.append('g')
        //     .call(lineGenerator)
        //         .attr('fill', 'rgba(33, 146, 219, 0.4)')

        //     .attr("id","chart-background")

            


            // const lineGenerator = d3.line() 
            // .x(d => xScale(xValue(d)))
            // .y(d => yScale(yValue(d)))
            

        

        // svg.selectAll('.line')  //poprzedni generator lini
        //     .data(chartData)
        //     .join('path')

               
        //         .attr('fill', 'none')
        //         .attr('stroke', 'black')


            
            

             
    
        svg.selectAll(".circle-point")
            .data(chartData)
            .join("circle") // enter append
                .attr("id", d=>d.id)
                  .attr("class", "circle-point")
                  .attr("fill", "purple")
                  .attr("z-index", "20")
                  .attr("z-index", "99999999")
                  .attr("r", "4") // radius
                  .attr("cx", d=> xScale(d.x))   // center x passing through your xScale
                  .attr("cy", d=> yScale(d.y))
                  .on('mouseover', function (i, d) {
   

                        hovering.transition()
                            .style("opacity", 1);



                    console.log('y: ', d.y)
                    console.log('x: ', d.x)
                    console.log(i)

                    
                })
                .on('mouseleave', function (i, d) {
                    console.log('bajbvaj')
                    hovering.transition()
                    .style("opacity", 0);
                    
                })
                .on("click", function(i , d) {

                    console.log(i)
                    console.log(d)
                    if(idArr.includes(d)){
                        deleteArr(d)
                    }
                    else{
                        const newArr = [...idArr, d]
                        setIdArr(newArr)
                    }
                    console.log('idArr: ', idArr)


                })

        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat( i => i )

        const hoverXAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickFormat( i => ' ')

        
        const yAxis = d3.axisLeft(yScale)
            // .ticks(8)
            .tickSizeInner(-w)


        const hoverYAxis = d3.axisLeft(yScale)
        .ticks(0)
        .tickSizeInner(-w)
        .tickFormat( i => 'bndssdna ')

        const hovering = svg.append('g' )
            .data([chartData])


            .call((hoverXAxis).ticks(1).tickSizeInner(-(h-yScale(data.y)))) 
            .attr('transform', `translate(${xScale(data.x)}, ${h})`)
            .attr('visibility', 'visible')
            
            

        svg.append('g')
            .call((xAxis).ticks(data.length).tickSizeInner(-h)) 
            .attr('transform', `translate(0, ${h})`)
            .attr("z-index", '1')
            .attr("class", "xAxis")


        svg.append('g')
            .call(yAxis)     
            .attr("z-index", '1')

            // .attr('transform', `translate(0, ${h})`)

                    
        // svg.append('g')
        //     .attr('class', 'x axis-grid')
        //     .attr('transform', 'translate(0,' + h + ')')
        //     .call(xAxis);
            
        // svg.append('g')
        //     .attr('class', 'y axis-grid')
        //     .call(yAxis);

        // svg
        //     .append("g")
        //     .attr('transform', `translate(0, ${h})`)
        //     .call(d3.axisBottom(x).ticks(5).tickSizeInner(-h)) 
            

        // gówno pod wykresemn
            //     svg.append("path")
            // .datum(data)
            // .attr("class","line")
            // .attr('fill', 'rgba(33, 146, 219, 0.4)')

            // .attr("id","chart-background")
            // .attr("d", generateScaledLine);

            
        //czarne tlo na wykres ^

                // svg.selectAll(".line")
        //     .on("mouseover", function(){
        //         svg.select(this)
        //             .style("background-color", "red")
        //     })
        //     .on("mouseout", function(){
        //         svg.select(this)
        //             .style("background-color", "green")

        //     })

        // const tip = d3.select("body").append("div")
        //         .attr("class", "tooltip")
        //         .style("opacity", 0)
        //     // Add events to circles
        //    circles.on("mouseover", function(d) {
        //     tip.style("opacity", 1)
        //         .html(d.country + "<br/> Gold: " + d.gold + "<br/> Silver: " + d.silver)
        //         .style("left", (d3.event.pageX-25) + "px")
        //         .style("top", (d3.event.pageY-75) + "px")
        //     })
        //     .on("mouseout", function(d) {
        //         tip.style("opacity", 0)
        //     })
                

    }, [data])


    const dataCheck = () =>{
        console.log(yData)
        console.log(data)
    }

    const deleteArr = (id) =>{

        const newArr = idArr.filter((arr)=> arr !== id)
        console.log(newArr)
        setIdArr(newArr);
      }


      const w = 500;
      const h = 200;


      const lineGenerator = d3.line() 
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))

      const xValue = d => d.x;
      const yValue = d => d.y;

      
          
  
      const xScale = d3.scaleLinear()
        //   .domain([0, max(chartData, d=>d.x)])
        
          .domain([0, 160])
          .domain([0, (max(chartData, d=>d.x))+10])
          .range([0, w])                     //range do roboty

          const yScale = d3.scaleLinear()
          .domain([0, (max(chartData, d=>d.y)*2)])
          .range([h, max(chartData, d=>d.y)])

    //   const yScale = d3.scaleLinear()
    //       .domain([0, h])
    //       .range([h, 0])


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