import React from "react"
import { Logo } from "loft-taxi-mui-theme"
import { Button, Grid, Container } from "@material-ui/core"

require('../styles/Header.scss')

const Header = ({switchRoute}) => {
  return (
    <header className="header">
      <Container>
        <Grid container alignItems="center" justify="space-between">
          <Grid>
            <Logo/>
          </Grid>
          <Grid>
            <Button onClick={()=>{
              switchRoute('order')
            }}>Карта</Button>
            <Button onClick={()=>{
              switchRoute('profile')
            }}>Профиль</Button>
            <Button onClick={()=>{
              switchRoute('auth')
            }}>Выйти</Button>
          </Grid>
        </Grid>
      </Container>
    </header>
  )
}

export default Header
