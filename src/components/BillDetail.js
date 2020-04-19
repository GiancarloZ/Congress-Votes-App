import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
const BillDetail = (bill) => {
    const classes = useStyles();
        return (
            <div>
                <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {bill.bill_slug} - {bill.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
    
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">

                    </Typography>

                    <Typography variant="body2" component="p">

                        <br />

                    </Typography> 
       
                </CardContent>
                
                <CardActions>
                    <Button size="small">Show Less</Button>
                </CardActions>
                </Card>
            </div>
        )

}
export default BillDetail 