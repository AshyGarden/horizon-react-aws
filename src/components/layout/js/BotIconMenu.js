import React from 'react'
import '../scss/boticonmenu.scss'
import { Grid } from '@mui/material';
import { Button } from 'reactstrap';

const BotIconMenu = () => {

  return (
   
    <div className='bot-btn-container'>
      <>
        <div className='bot-btn-group'>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button className='bot-btn bot-btn1'>
              
            </Button>
            <Button className='bot-btn bot-btn2'>

            </Button>
            <Button className='bot-btn bot-btn3'>

            </Button>
            <Button className='bot-btn bot-btn4'>

            </Button>
            <Button className='bot-btn bot-btn5'>

            </Button>
            <Button className='bot-btn bot-btn6'>

            </Button>
            <Button className='bot-btn bot-btn7'>

            </Button>
            <Button className='bot-btn bot-btn8'>

            </Button>
            <Button className='bot-btn bot-btn9'>

            </Button>
          </Grid>
        </div>
      </>
    </div>  
  )
}

export default BotIconMenu