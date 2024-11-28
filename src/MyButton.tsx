import Button from "@mui/material/Button";


export type ButtonPropsType = {
    title: string
    onClick: ()=>void
    className?: string
}

export const MyButton = ({title, onClick, className}: ButtonPropsType) => {
    return (
        <button className={className} onClick={onClick}>
            {title}
        </button>
        // <Button variant={'contained'} className={className} onClick={onClick} >
        //     {title}
        // </Button>

    )
}