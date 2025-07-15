const NameSVG = ({isFocused=false}) => {

  return (
    <svg
      style={{
        width: "100%",
        // width: "fit-content",
        height: "60%",
        transform: "scaleX(1.05)",
        // border: "1px solid"
      }}
      width="800px" height="800px" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
      stroke={isFocused? "var(--color3)":"var(--color1)"} 
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke={isFocused? "var(--color3)":"var(--color1)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default NameSVG