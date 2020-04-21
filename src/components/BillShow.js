import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BillDetail from './BillDetail'
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const handleOnClick = (event) => {
    return(
      <div>
          <BillDetail bill={event.target.value} />
      </div>
    )
}
const BillShow = ({bills}) => {
  const classes = useStyles();
  
 

  return (
    <div className={classes.root}>

    <Autocomplete
        multiple
        id="tags-standard"
        options={bills}
        getOptionLabel={(option) => option.bill_slug}
        defaultValue={bills}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Bills"
            placeholder="You can choose as many as you'd like"
          />
        )}
    />

    {bills.map((bill) => 
        <Card className={classes.root} variant="outlined">
       
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {bill.bill_slug} - {bill.short_title}
                </Typography>
            </CardContent>
       
        <CardActions onClick={(event) => handleOnClick(event)}>
            <Button size="small" >See More</Button>
        </CardActions>
        </Card>
    )}

    </div>
  )
}
export default BillShow