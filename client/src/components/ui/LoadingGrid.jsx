import { Grid } from 'react-loader-spinner'

const LoadingGrid = () => {

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh"
        }}>
            <Grid
                visible={true}
                height="200"
                width="200"
                color="var(--color1)"
                ariaLabel="grid-loading"
                radius="12.5"
            />
        </div>
    )
}

export default LoadingGrid