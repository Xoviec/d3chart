import chartData from '../JSON/data.json'
import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3';
import '../App.css' 
import { extent, max, scaleLinear, line } from 'd3';

export const Chart = ()=>{

    const [proba, setProba] = useState(0)
    const [idArr, setIdArr] = useState([])


    
    // const [lineGenerator, setLineGenerator] = useState()
    // const [data] = useState([25,50,35,15,94,50])
    const [chartData] = useState(
        [
  {
    "id": 1,
    "x": 10,
    "y": 0.5,
    "target": 1,
    "prediction": 0,
    "diagnosisGroupId": 1
  },
  {
    "id": 2,
    "x": 30,
    "y": 0.52,
    "target": 0,
    "prediction": 0,
    "diagnosisGroupId": 5
  }, {
  "id": 3,
  "x": 50,
  "y": 0.53,
  "target": 1,
  "prediction": 0,
  "diagnosisGroupId": 5
}, {
  "id": 4,
  "x": 70,
  "y": 0.6,
  "target": 1,
  "prediction": 0,
  "diagnosisGroupId": 5
},
  {
    "id": 5,
    "x": 90,
    "y": 0.7,
    "target": 0,
    "prediction": 0,
    "diagnosisGroupId": 1
  }, {
  "id": 6,
  "x": 110,
  "y": 0.65,
  "target": 1,
  "prediction": 0,
  "diagnosisGroupId": 5
}, {
  "id": 7,
  "x": 130,
  "y": 0.75,
  "target": 1,
  "prediction": 0,
  "diagnosisGroupId": 5
}, {
  "id": 8,
  "x": 150,
  "y": 1.2,
  "target": 1,
  "prediction": 0,
  "diagnosisGroupId": 5
}]

        // [
        //     {
        //         id: 1,
        //         x: 1,
        //         y: 2
        //     },
        //     {
        //         id: 2,
        //         x: 2,
        //         y: 4
        //     },
        //     {
        //         id: 3,
        //         x: 3,
        //         y: 8
        //     },
        //     {
        //         id: 4,
        //         x: 4,
        //         y: 5
        //     },
        //     {
        //         id: 5,
        //         x: 5,
        //         y: 5
        //     },
        //     {
        //         id: 6,
        //         x: 6,
        //         y: 2
        //     },
        // ]
    )

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

        const margin =  {top: 10, right: 30, bottom: 30, left: 50};
        // const w = 400;
        // const h = 100;
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style('background', '#d3d3d3')
            .style('margin-top', '50')
            .style('overflow', 'visible')

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
 
        const Tooltip = d3.select("#div_template")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")


            // const lineGenerator = d3.line() 
            // .x(d => xScale(xValue(d)))
            // .y(d => yScale(yValue(d)))
            

        

        svg.selectAll('.line')  //poprzedni generator lini
            .data(chartData)
            .join('path')
               
                .attr('fill', 'none')
                .attr('stroke', 'black')



    
        svg.selectAll(".circle-germany")
            .data(chartData)
            .join("circle") // enter append
                .attr("id", d=>d.id)
                  .attr("class", "circle-germany")
                  .attr("fill", "black")
                  .attr("z-index", "99999999")
                  .attr("r", "4") // radius
                  .attr("cx", d=> xScale(d.x))   // center x passing through your xScale
                  .attr("cy", d=> yScale(d.y))
                  .on('mouseover', function (i, d) {
                    console.log('y: ', d.y)
                    console.log('x: ', d.x)
                    
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
        
        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSizeInner(-w)
            

        svg.append('g')
            .call((xAxis).ticks(data.length).tickSizeInner(-h)) 
            .attr('transform', `translate(0, ${h})`)
            

        svg.append('g')
            .call(yAxis)     
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


      const w = 400;
      const h = 100;


      const lineGenerator = d3.line() 
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))

      const xValue = d => d.x;
      const yValue = d => d.y;

      
          
  
      const xScale = d3.scaleLinear()
          .domain([0, max(chartData, d=>d.x)])
          .range([0, w])


          const yScale = d3.scaleLinear()
          .domain([0, max(chartData, d=>d.y)])
          .range([h, max(chartData, d=>d.y)])

    //   const yScale = d3.scaleLinear()
    //       .domain([0, h])
    //       .range([h, 0])


    return(
        <div className='container'>
            <svg ref={svgRef}>
                
                <path d={lineGenerator(chartData)}/>
             
              
                {/* <path d={generateScaledLine(chartData)}/> */}

            </svg>
            <div>
            {
                idArr.map((el)=>
                <button className='tooltip' value={el} onClick={()=>deleteArr(el)}>
                        <p>{el.id}</p>
                        <p>{`X: ${el.x}`}</p>
                        <p>{`Y: ${el.y}`}</p>
  
                </button>
                )
            }
            
            </div>
            <button onClick={dataCheck}>elo</button>

        </div>
    )
}