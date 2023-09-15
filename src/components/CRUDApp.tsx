import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material';
import typographyClasses from '@mui/material';
import { useEffect,useState } from "react"
import { AgGridReact } from "ag-grid-react"
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Grid, IconButton } from "@mui/material";
import InsertDialog from "./Dialog"
import Button from '@mui/material/Button';
import { alignProperty } from '@mui/material/styles/cssUtils';

function CRUDApp(){
  const url='http://localhost:4000/users'

  const [myData,setMyData]=useState([]);
  const [open, setOpen] = useState(false);
  const [formData,setFormData]= useState({name:"",salary:"",married:""});

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleFormSubmit=()=>{
  if(formData.id){
    console.log("this is form id "+formData.id)
    fetch(url+'/'+formData.id,{method:"PUT",body:JSON.stringify(formData),headers:{"content-type":"application/json"}}).then((resp)=>{
      return resp.json()
      }).then((resp)=>{
        getData()
        }
      )
  }
else{
  fetch(url,{method:"POST",body:JSON.stringify(formData),headers:{"content-type":"application/json"}}).then((resp)=>{
return resp.json()
}).then((resp)=>{
  getData()
  }
)}
}
const handleUpdate=(oldData)=>{
  handleClickOpen(open)
  setFormData(oldData)
   }

const handleDelete=(id)=>{
  const confirm=window.confirm("Are you sure you want to delete id number "+id)
  console.log(confirm)
  if(confirm){
  fetch(url+'/'+id,{method:"DELETE"}).then((resp)=>{return resp.json()}).then((resp)=>{
    console.log(resp)
    getData()})}    
  }
  const handleNewUserOpen=()=>{
    setFormData({name:"",salary:"",married:""});
    setOpen(true);
  };
const columns=[
  {headerName:'Id',field:'id' },
  {headerName:'Name',field:'name'},
  {headerName:'Salary',field:'salary'},
  {headerName:'Marital Status',field:'married'},
  {headerName:'Actions', field:'id', cellRenderer: (myData) => {
  // put the value in bold
  return <div>
    <Button variant="contained" onClick={()=>handleUpdate(myData.data)}>Update</Button>
    <Button variant="contained" onClick={()=>handleDelete(myData.value)}>Delete</Button>
    </div>
}}
]

  const colProp={
  sortable:true,editable:true,filter:true
}
 const getData=()=>{
      fetch(url,{headers:{
        'Content-Type':'application/json',
        'Aceept':'application/json'
}}).then((resp)=>{
  return resp.json()
}).then((resp)=>
{//console.log(data)
setMyData(resp)
handleClose()
setFormData({name:"",salary:"",married:""})
})
    }
useEffect(()=>{
getData()
},[])

const onChange=(e)=>{
console.log(e)
const {value,id}=e.target
setFormData({...formData,[id]:value})
}

return(
<div>
<h1  style={{ fontSize: 45,fontFamily:"Broadway" }}>CRUD Application</h1>
<div className="ag-theme-alpine"  style={{height: 1000, width: 1350}} >

<Grid textAlign={'left'}>
      <Button variant="contained" onClick={handleNewUserOpen}>
        NEW EMPLOYEE
      </Button>
      </Grid>

{//myData.map((curElm) =>  <h1>id={curElm.id} , name={curElm.name}, salary={curElm.salary}, marital status={curElm.married}</h1>)
} 

<AgGridReact rowData={myData} columnDefs={columns} defaultColDef={colProp}></AgGridReact>
 </div>
<InsertDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>
</div>
)
}
export default CRUDApp;