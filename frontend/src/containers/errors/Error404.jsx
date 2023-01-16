import Layout from "../../hocs/Layout"

const Error404 = ({ children, ...props }) => {
  return (
    <Layout>
      <div className="text-[#f23838] text-center ml-[0.5rem] mr-0"
        {...props}
      >
        {children}
      </div>
    </Layout>
  )
}

export default Error404