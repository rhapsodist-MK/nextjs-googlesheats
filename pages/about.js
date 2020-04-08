import React from 'react'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
// import Tabletop from 'tabletop'

import Layout from '../components/global/Layout'

// const fetcher = (url) => {
//   return fetch(url).then(r => r.json())
// }

const About = () => {
  // const { data, error } = useSWR('/api/googleSheet', fetcher)

  // if (!data) return (<div>loading...</div>)
  
  return (
    <Layout>
      <div>
        about
        {/* {data.quote}
        {data.author} */}
      </div>
    </Layout>
  )
}

// About.getInitialProps = async () => {
  
// }

export default About