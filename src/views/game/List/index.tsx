import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch, thunkActions } from 'state'
import { CardElem } from './CardElem'
import { Grid, Typography, makeStyles, colors, Paper } from '@material-ui/core'
import { useSignIn } from 'utils'

const useStyles = makeStyles({
  title: {
    fontSize: 18,
    color: colors.grey[800],
  },
  lang: {
    fontSize: 12,
    margin: 12,
    color: colors.grey[600],
  }
})

const GameList: React.FC = () => {
  const gameList = useAppSelector(state => state.gameList)
  const signIn = useSignIn()
  const classes = useStyles()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (signIn) dispatch(thunkActions.gameList.getGames())
  }, [dispatch, signIn])

  return (
    <Paper elevation={10} square>
      <Grid container justify='center'>
        {gameList.map((game, index) => {
          return (
            <CardElem key={index} index={game.index}>
              <Typography className={classes.title} color='textPrimary'>
                {game.title}
              </Typography>
              <Typography className={classes.lang} color='textSecondary'>
                {game.lang}
              </Typography>
            </CardElem>
          )
        })}
      </Grid>
    </Paper>
  )
}

export default GameList
