import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { RotatingTriangles} from 'react-loader-spinner'
import {CgCornerDoubleLeftDown} from 'react-icons/cg'
import {BsArrowLeft} from 'react-icons/bs'
import Slider from "react-slick";
import {useAuth} from './Auth'
import { BehaviorSubject ,debounceTime,mergeMap,from,distinctUntilChanged} from 'rxjs'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import "./product.css"

function SampleNext(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}
const searchItem = [{ id: "mobile", value: "Mobile" }, { id: "laptop", value: "Laptop" }, { id: "spray", value: "Spray" }, { id: "perfume", value: "Perfume" }, { id: "food", value: "Food" }]


function InputItem(props) {
  const { search, setSearch} = props
  const navigate = useNavigate()
  const auth=useAuth()
  const navigateSearch = (value, check) => {

    check ? navigate({ pathname: "/products/search" }) : navigate({ pathname: "/products/search", search: `?q=${value}` })
  }
  const inputStyle=(active)=>{
    return {backgroundColor: "lightGray" ,
    display:"flex",
    flexDirection:active ? "row" : "column",
    alignItems:active ? "center" :"flex-start",
    height:active ? "10vh" : "90vh",
    width:active ? "100%" : "15%"
  }
  }
  const filterStyles=(active)=>{
    return{
      listStyleType: "none",
       paddingLeft: "5px" ,
       display:"flex",
       flexDirection : active ? "row" :"column",
       alignItems:active ? "center" : "flex-start",
       justifyContent:"flex-start"
    }
  }
  return (
    <div style={inputStyle(auth.show)}>
     <CgCornerDoubleLeftDown style={{fontSize:"20px"}} onClick={()=>auth.display()} />
      <button type="button" style={{ marginTop: "5px",backgroundColor:"transparent",border:"0px solid white" }} onClick={() => {
        navigateSearch(search, true)
        searchSubject.next('')
        cancelSubject.next(true)
        setSearch('')
      }}><BsArrowLeft style={{fontSize:"20px"}}/></button>
      <br />
      <input value={search} type="search" placeholder="search" style={{ margin: "7px" }} onChange={(e) => setSearch(e.target.value)} />
      <button type="button" style={{ marginLeft: "10px" }} onClick={() => {
        // setItem(search)
        navigateSearch(search, false)
        searchSubject.next(search)

      }}  >search</button>


      <ul style={filterStyles(auth.show)}>
        {searchItem.map(each => {
          const check = searchSubject.value === each.value
          return (
            <li key={each.id}>
              <input value={each.value} id={each.id} type="checkbox" onChange={(e) => {
                navigateSearch(each.value, check)
                // setItem(e.target.value)
                searchSubject.next(e.target.value)
                // setCheck(prevState => !prevState)
              }}
                checked={check} />
              <label htmlFor={each.id}>{each.value}</label>
            </li>
          )
        })}
      </ul>

    </div>
  )
}



function ProductItem(props) {
  const { userproducts } = props
  const auth=useAuth()
  const settings = {
    dots: true,
    infinte: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNext />,
    prevArrow: <SamplePrevArrow />
  };
  
  return (
    <div style={{  backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", overflowY: "auto" ,height:auth.show ? "80vh" : "90vh"}} className="product-item">

      {userproducts.map(each => (
        <div key={each.id} style={{ margintop: "10px", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "20%", border: "1px solid white", borderRadius: "5px" }}>
          <div style={{ backgroundColor: "white", width: "50%", marginBottom: "40px", marginLeft: "0px", marginTop: "20px", padding: "10px", }}>
            <Slider {...settings}>
              {each.images.map(each => (
                <div key={uuidv4()}>
                  <img width="100%" height="50%" src={each} alt="Product" />
                </div>
              ))}
            </Slider>
          </div>
          <h4 style={{ color: "black" }}>{each.title} - <span style={{color:"green"}}>{auth.selectValue}</span></h4>
        </div>
      ))}
    </div>
  )
}
const dataProduct= async (Item)=>{
  loadingSubject.next(true)
  const response=await fetch(`https://dummyjson.com/products/search?q=${Item}`)
  const data=await response.json()
  loadingSubject.next(false)

  return data.products
  // fetch(`https://dummyjson.com/products/search?q=${Item}`)
  // .then(response=>{return response.json()})
  // .then(data=>{return data.products})
  
}

const searchSubject=new BehaviorSubject("") 
const cancelSubject = new BehaviorSubject(false)
const loadingSubject=new BehaviorSubject(false)
// const loadingResult=loadingSubject.pipe(debounceTime(1000),distinctUntilChanged(),mergeMap((v)=>of(!loadingSubject.value)))
const searchResult=searchSubject.pipe(debounceTime(1000),distinctUntilChanged(),mergeMap((v)=>from(dataProduct(v))))

const useObservable= (observer,observerz,setter,lodder)=>{
  useEffect(()=>{  
    observerz.subscribe(v=>{
      console.log(v)
      lodder(v)}) 
    let sub=observer.subscribe((v)=>{
      console.log(v)
      setter(v)
    })
    // const effectload= concat(load,delay(1000),sub)
    // effectload.subscribe(v=>console.log(v))
    // loadingSubject.next(false)
    return ()=>sub.unsubscribe()
  },[observer,observerz,setter,lodder])

}

function Products() {
  const [userproducts, setUserProducts] = useState([])
  const [search, setSearch] = useState("")
  const [Item, setItem] = useState("")
  const [Loading ,setLoading] = useState("")
  const auth=useAuth()
  const changeshape = (auth.show) ?  null : "setrow"
  
  useObservable(searchResult,loadingSubject,setUserProducts,setLoading)
  

  
  // const productData = useRef(async (Item) => {
  //   setLoading(true)
  //   const response = await fetch(`https://dummyjson.com/products/search?q=${Item}`)
  //   const data = await response.json()
  //   setUserProducts(data.products)
  //   setLoading(false)
  // })
  // useEffect(() => {
  //   console.log("effect")
  //   productData.current(Item)
  // }, [Item])

  return (
    <>  
  <div className={`productShow ${changeshape}`}>
      <InputItem search={search} setSearch={setSearch} Item={Item} setItem={setItem} />
      {Loading ? <div style={{ backgroundColor: "black",height: "100vh", display: "flex", justifyContent: "center", alignItems: "center",width:"100%" }}> 
      <RotatingTriangles
  visible={true}
  height="80"
  width="80"
  ariaLabel="rotating-triangels-loading"
  wrapperStyle={{}}
  wrapperClass="rotating-triangels-wrapper"
  />
      </div>
        : <ProductItem userproducts={userproducts} />}
    </div>  
    </>
  )

}


export default Products