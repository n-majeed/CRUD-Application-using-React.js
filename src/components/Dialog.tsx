import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'

export default function InsertDialog({open,handleClose,data,onChange,handleFormSubmit}) {
  const {id,name,salary,married}=data;

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id?"Update Users":"Enter New Record"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <form>
           <TextField onChange={e=>onChange(e)} value={name} id="name" placeholder='Enter your Name' fullWidth variant='outlined' margin="dense"></TextField>
           <TextField onChange={e=>onChange(e)} value={salary} id="salary" placeholder='Enter your Salary' fullWidth variant='outlined' margin="dense"></TextField>
           <TextField onChange={e=>onChange(e)} value={married} id="married" placeholder='Enter your Marital Status' fullWidth variant='outlined' margin="dense"></TextField>
          {/* <TextField id="Gender" placeholder='Enter your Gender' fullWidth variant='outlined' margin="dense"></TextField>
           <TextField id="JDate" placeholder='Enter your Joining Date' fullWidth variant='outlined' margin="dense"></TextField>*/}
           </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleFormSubmit()} variant="contained" >{id?"Update":"Save"}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
