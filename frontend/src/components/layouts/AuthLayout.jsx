import bgImage from '../../assets/images/bg.jpg'

const AuthLayout = ({ children }) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* System name at the top */}
      <div className="absolute top-6 left-6">
        <h2 className="text-lg font-medium text-white">Kkopi.Tea</h2>
      </div>

      {/* Centered form */}
      <div className="w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout;
