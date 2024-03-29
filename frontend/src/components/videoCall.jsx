import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useEffect, useRef } from 'react'

const ClouldVideoCall = () => {
  useEffect(() => {}, [])
  const { userId } = useParams()
  console.log(userId)
  const myMeeting = async (element) => {
    const appID = 1364677669
    const serverSecret = 'ae584cca72c32e91bf243027d193274e'
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      userId,
      Date.now().toString(),
      'sachin',
    )
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    console.log('Kit Token:', kitToken)
    console.log('User ID:', userId)
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Copy LinK',
          url: `https://sachinkrishna.me/room/${userId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    })
  }

  return (
    <div>
      <div ref={myMeeting} />
    </div>
  )
}

export default ClouldVideoCall