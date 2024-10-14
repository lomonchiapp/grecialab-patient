
import { Grid } from '@mui/material'
// Import Steps
import { Start } from './Start'
import {Name} from './Name'
import { Services } from './Services'
import { useFormState } from '../../hooks/useFormState'
import { Review } from './Review'

export const QueueForm = () => {
    const { currentStep } = useFormState()
  return (
    <Grid style={styles.page}>
        <Grid style={styles.form}>
        {currentStep === 1 && <Start />}
        {currentStep === 2 && <Name />}
        {currentStep === 3 && <Services />}
        {currentStep === 4 && <Review />}

        </Grid>
    </Grid>
  )
}

const styles = {
    page: {
        display: 'flex',
        height: '100vh',
        width: '100%',
        backgroundColor: '#28358B',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    form: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px'
    }
}
