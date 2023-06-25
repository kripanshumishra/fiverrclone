export default function FormStateHeader( { currentPage , totalPage }) {
  return (
    <div style={{ display : "flex" , justifyContent : "flex-end" }}>
        <div> { currentPage } / { totalPage } </div>
    </div>
  )
}
