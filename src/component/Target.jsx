import {useGLTF} from "@react-three/drei";
import {useRef} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

const Target = (props) => {
    const targetrRef = useRef()
    const {scene} = useGLTF('/models/cube.glb')

    useGSAP(() => {
        gsap.to(targetrRef.current.position, {
                y: targetrRef.current.position.y + 0.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true
            }
        )
    })


    return (
       <mesh {...props} ref={targetrRef} rotation={[0,Math.PI/5,0]} scale={1.5} >
           <primitive object={scene} />
       </mesh>


    )
}

export default Target
