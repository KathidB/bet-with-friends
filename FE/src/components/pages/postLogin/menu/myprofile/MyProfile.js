import UserInfo from '../../common/userinfo/UserInfo'

function MyProfile () {
  const { userProfile } = UserInfo()

  console.log(userProfile)

  return (
    <section style={{ marginBottom: '30px' }} className='app-wrap'>
      <div className='login'>
        <h2 className='section-title'>Mój profil</h2>
      </div>
    </section>
  )
}

export default MyProfile
