import React,{useState,useEffect} from 'react'
import data from '../data/menu.json'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Tree } from 'primereact/tree'
// import { PanelMenu } from 'primereact/panelmenu';
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import 'primeicons/primeicons.css'
import './menu.css'

const Menu = () => {
    const [visible, setVisible] = useState(false)
    const [nodes, setNodes] = useState([]);
    const [selectedKey, setSelectedKey] = useState('');
      
        useEffect(()=>{
            const megaParent=  data.filter(each=>each.parentid===null)
        const MegaParentId=megaParent.map(each=>({label: each.text , id : each.id,key:each.key}))
        // console.log(MegaParentId)
        const ChildrenId= MegaParentId.map(each=>{
              const parent=each.id 
              const filterChildren=data.filter(each=>each.parentid===parent)
              const labelChildrenData= filterChildren.map(each=>({label:each.text,childId:each.id,key:each.key}))
              const childChildrenData=labelChildrenData.map(each=>{
                const child=each.childId
                const filterChildChild=data.filter(each=>each.parentid===child)
                const labelChildChildData=filterChildChild.map(each=>({label:each.text,childChildId:each.id,key:each.key})) 
                const childchildchildData=labelChildChildData.map(each=>{
                    const child=each.childChildId
                    const filterChildChildChild=data.filter(each=>each.parentid===child)
                    const labelChildChildChildData=filterChildChildChild.map(each=>({label:each.text,childChildId:each.id,key:each.key}))
                    // console.log(labelChildChildChildData)
                    return labelChildChildChildData
                })  
                let ChildChildMenu=[]  
                for(let i=0; i< labelChildChildData.length;i++){
                    for(let j=0; j< childchildchildData.length ; j++){
                        if(i===j){
                            ChildChildMenu.push({...labelChildChildData[i],children:childchildchildData[j]})
                        }
                    }

                }
                // console.log(ChildChildMenu)
                return ChildChildMenu
              })
            //   console.log(labelChildrenData)
            //     console.log(childChildrenData)
                let childMenu=[]
                for(let i=0; i<labelChildrenData.length;i++){
                    for(let j=0; j<childChildrenData.length ; j++){
                        if(i===j){
                            childMenu.push({...labelChildrenData[i],children:childChildrenData[j]})
                        }
                    }
                }            
              return childMenu             
        })
    //    console.log(ChildrenId)
       let MainMenu=[] 
       for (let i=0 ; i<MegaParentId.length ; i++){
        for (let j=0 ; j<ChildrenId.length ;j++){
            if(i===j){
                MainMenu.push({...MegaParentId[i],children:ChildrenId[j]})
            }
        }
       }
    //    console.log(MainMenu)
            setNodes(MainMenu)
                 
        },[])
      
    //    console.log(selectedKey)
        return (
            <div className="cardx flex justify-content-center ">
                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <div className="cardz flex justify-content-center">
            <Tree value={nodes} selectionMode="single" selectionKeys={selectedKey} onSelectionChange={(e) =>setSelectedKey(e.value) } className="w-full md:w-30rem" />
            {/* <PanelMenu model={nodes} className="w-full md:w-25rem" />  */}
        </div>                  
                </Sidebar>
                <Button icon="pi pi-bars" className="p-button-secondary "  onClick={() => setVisible(true)} />
                <img src="https://dev.veri-fuel.com/qa/UiAssets/images/vf/VeriFuel_Logo.svg" className="image" alt="veryfuel" />
            </div>
        )   

 
}

export default Menu