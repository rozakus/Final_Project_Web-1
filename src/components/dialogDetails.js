import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogDetails({detail}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Details
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Details Package"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ul>
            {detail.map((item, index) => {
              return <li key={index}>Category: {item.category}, Max. Quantity={item.max_qty}</li>
            })}
            </ul>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}