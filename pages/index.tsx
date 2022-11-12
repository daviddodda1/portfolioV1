import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, createRoot, Canvas, useLoader } from "@react-three/fiber";
import { motion, useAnimationFrame } from "framer-motion";
import Head from "next/head";
import { Suspense, useEffect, useRef, useState } from "react";
import THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styles from "../styles/Home.module.css";
import { GLTF } from "three-stdlib";
import useMouse from "@react-hook/mouse-position";

export default function Home() {
  const dobInUnix = 891144000;
  const YEAR_TO_SECONDS = 31536000;
  const [age, setAge] = useState("0");

  const [hoverLanguage, setHoverLanguage] = useState("#fff");

  const [showOthersLaunguages, setShowOthersLaunguages] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const programmingLang = [
    "NodeJs",
    "ReactJs",
    "Python",
    "Mongodb",
    "NestJs",
    "VueJs",
    "Redis",
    "React Native",
    "Web-Sockets",
    "Web3Js",
    "Solidity",
    "Solana",
    "AWS",
    "Digital Ocean",
    "Jenkins",
    "GitHub Actions",
    // "Docker",
    "CloudFlare DNS",
    // "Arduino",
    // "esp32",
    // "Pi Pico",
  ];

  const colorArr = [
    "#ffcfcf",
    "#caffbf",
    "#ffd6a5",
    "#fdffb6",
    "#bdb2ff",
    "#9bf6ff",
    "#a0c4ff",
    "#ffc6ff",
  ];

  const [langSelection, setLangSelection] = useState("");

  const main_ref = useRef(null);
  const mouse = useMouse(main_ref, {
    enterDelay: 100,
    leaveDelay: 100,
  });
  setInterval(() => {
    const now = new Date().getTime();
    const ageInSeconds = ((now / 1000 - dobInUnix) / YEAR_TO_SECONDS).toFixed(
      9
    );
    setAge(ageInSeconds);
  }, 100);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <motion.div ref={main_ref} className={styles.container}>
        <Head>
          <title>David Dodda</title>
          {/* TODO: Update after branding */}
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {pageLoading ? (
            <motion.div className={styles.Spinner}>
              <img
                className={styles.SpinnerImg}
                style={{ width: "10rem" }}
                src={"/logo.png"}
                alt="spinner"
              />
              <h4 style={{ display: "block" }}>Loading...</h4>
            </motion.div>
          ) : (
            ""
          )}
          {/* Main Name Text */}
          {!pageLoading ? (
            <>
              <div className={styles.MainNameText}>
                <span className={styles.blueText}>D</span>
                avid <span className={styles.blueText}>D</span>odda
              </div>

              {/* Age Text  */}
              <div className={styles.AgeText}>
                I am a <span className={styles.blueText}>{age}</span> year old
                developer.
              </div>

              {/* Languages */}
              <div className={styles.LanguagesUsed}>
                who uses{" "}
                <LanguageLink
                  setHover={setHoverLanguage}
                  color={colorArr[0]}
                  value={programmingLang[0]}
                  setSelection={setLangSelection}
                  currentSelection={langSelection}
                />
                ,{" "}
                <LanguageLink
                  setHover={setHoverLanguage}
                  color={colorArr[1]}
                  value={programmingLang[1]}
                  setSelection={setLangSelection}
                  currentSelection={langSelection}
                />
                ,{" "}
                <LanguageLink
                  setHover={setHoverLanguage}
                  color={colorArr[2]}
                  value={programmingLang[2]}
                  setSelection={setLangSelection}
                  currentSelection={langSelection}
                />
                , and{" "}
                <span
                  onClick={() => setShowOthersLaunguages(!showOthersLaunguages)}
                  className={styles.links}
                >
                  <span style={{ color: colorArr[3] }}> {"Others"}</span>
                  <span
                    style={{ backgroundColor: colorArr[3] }}
                    className={
                      !showOthersLaunguages
                        ? styles.underline
                        : styles.underlineSelected
                    }
                  ></span>
                </span>
              </div>
              <motion.div
                animate={showOthersLaunguages ? "open" : "close"}
                transition={{ duration: 0.2 }}
                variants={{
                  open: {
                    opacity: 1,
                    display: "block",
                    border: "2px solid #fff",
                  },
                  close: {
                    opacity: 0,
                    display: "none",
                    border: "0px solid #fff",
                  },
                }}
                className={styles.otherLanguagesContainer}
              >
                {programmingLang.map((lang, index) => {
                  if (index > 2) {
                    return (
                      <LanguageLink
                        setHover={setHoverLanguage}
                        color={
                          colorArr[index] || colorArr[index % colorArr.length]
                        }
                        value={lang}
                        setSelection={setLangSelection}
                        currentSelection={langSelection}
                        key={`LanguageLink-${index}`}
                      />
                    );
                  }
                })}
              </motion.div>

              <motion.div
                animate={showOthersLaunguages ? "close" : "open"}
                transition={{ duration: 0.2 }}
                variants={{
                  open: {
                    opacity: 1,
                    display: "block",
                  },
                  close: {
                    opacity: 0,
                    display: "none",
                  },
                }}
                className={styles.SocialMediaContainer}
              >
                Check out my{" "}
                <span
                  onClick={() =>
                    window.open("https://github.com/davidreddy293", "_blank")
                  }
                  className={styles.links}
                >
                  <span style={{ color: "#ccc" }}> {"GitHub"}</span>
                  <span
                    style={{ backgroundColor: "#ccc" }}
                    className={styles.underline}
                  ></span>
                </span>{" "}
                and{" "}
                <span
                  onClick={() =>
                    window.open("https://twitter.com/DavidDodda_", "_blank")
                  }
                  className={styles.links}
                >
                  <span style={{ color: "#ccc" }}> {"Twitter"}</span>
                  <span
                    style={{ backgroundColor: "#ccc" }}
                    className={styles.underline}
                  ></span>
                </span>
                . <br />
                <br /> I was last seen working on{" "}
                <span
                  onClick={() =>
                    window.open(
                      "https://github.com/davidreddy293/cloudflare_ddns",
                      "_blank"
                    )
                  }
                  className={styles.links}
                >
                  <span style={{ color: "#ccc" }}> {"Cloud Flare DDNS"}</span>
                  <span
                    style={{ backgroundColor: "#ccc" }}
                    className={styles.underline}
                  ></span>
                </span>
              </motion.div>
            </>
          ) : (
            ""
          )}

          <div className={styles.languagesSelectionContainer}>
            <div
              className={
                langSelection != ""
                  ? styles.threejsCanvas_langSelected
                  : styles.threejsCanvas
              }
            >
              <Canvas>
                <OrbitControls />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Head3DObj
                  position={[0, 0, 0]}
                  programmingLang={programmingLang}
                  colorArr={colorArr}
                  hoverLanguage={hoverLanguage}
                  currentSelection={langSelection}
                  mouse={mouse}
                />
              </Canvas>
            </div>
          </div>
          {!pageLoading ? (
            <div style={{ marginTop: "auto" }}>
              ps: Portfolio v2 with blog and articles coming soon
            </div>
          ) : (
            ""
          )}
        </main>
      </motion.div>
    </Suspense>
  );
}

function LanguageLink(props: {
  setHover: any;
  value: string;
  color: string;
  setSelection: any;
  currentSelection: string;
}) {
  return (
    <span
      onMouseEnter={() => props.setHover(props.value)}
      onMouseLeave={() => props.setHover("")}
      className={styles.links}
      // * this is going to desable the article and projects section
      // onClick={() => {
      //   if (props.currentSelection == "") {
      //     console.log("selected", props.value);
      //     props.setSelection(props.value);
      //   } else if (props.currentSelection == props.value) {
      //     props.setSelection("");
      //   }
      // }}
    >
      <span style={{ color: props.color }}> {props.value}</span>
      <span
        style={{ backgroundColor: props.color }}
        className={
          props.currentSelection == ""
            ? styles.underline
            : props.currentSelection == props.value
            ? styles.underlineSelected
            : styles.underlineNotSelected
        }
      ></span>
    </span>
  );
}

function Head3DObj(props: any) {
  const { nodes, materials } = useLoader(
    GLTFLoader,
    "./pl.glb"
  ) as GLTFResult_pl;

  const elRef = useRef<any>();
  // const  = useGLTF("");
  const max_tilt = Math.PI / 4;
  const [rotVec, setRotVec] = useState([Math.PI / 2, 0, 0]);
  useFrame((state, delta) => {
    if (
      props.mouse.x &&
      props.mouse.y &&
      props.mouse.x != 0 &&
      props.mouse.y != 0
    ) {
      const screenData = window.screen;
      const elimentData = elRef.current.position;
      const mouseVec = [
        Math.PI / 2 +
          ((props.mouse.y - elimentData.y - screenData.height / 2) /
            screenData.height) *
            max_tilt,
        0,
        -(
          (props.mouse.x - elimentData.x - screenData.width / 2) /
          screenData.width
        ) * max_tilt,
      ];
      setRotVec(mouseVec);
    } else {
      setRotVec([Math.PI / 2, 0, 0]);
    }
  });
  return (
    <>
      <group
        {...props}
        scale={[1.5, 1.5, 1.5]}
        rotation={rotVec}
        position={[0, -0.15, 0]}
        dispose={null}
        ref={elRef}
      >
        <mesh
          geometry={nodes.profileImg.geometry}
          material={materials.profileImg}
        />
      </group>
      {props.programmingLang.map((lang: string, index: number) => {
        return (
          <ProgrammingLanguageSpear
            key={"lang" + index}
            color={
              props.colorArr[index] ||
              props.colorArr[index % props.colorArr.length]
            }
            isHoverActive={
              props.currentSelection == props.programmingLang[index]
                ? true
                : props.currentSelection == "" &&
                  props.hoverLanguage == props.programmingLang[index]
            }
            r={2.5}
            posVec={[
              2.7 *
                Math.sin((index * 2 * Math.PI) / props.programmingLang.length),
              2.7 *
                Math.cos((index * 2 * Math.PI) / props.programmingLang.length),
              0,
            ]}
            index={index}
            mouse={props.mouse}
            nodes={nodes}
            materials={materials}
          ></ProgrammingLanguageSpear>
        );
      })}
    </>
  );
}

const pl_nodesList = [
  "nodejs",
  "react",
  "python",
  "mongodb",
  "nestjs",
  "vuejs",
  "redis",
  "reactnative",
  "websockets",
  "web3",
  "solidity",
  "solana",
  "aws",
  "digitalocean",
  "jankins",
  "github",
  "cloudflare",
];

const pl_meterialList = [
  "Nodejs",
  "React",
  "Python",
  "Mongodb",
  "Nestjs",
  "Vuejs",
  "Redis.001",
  "ReactNative",
  "WebSockets",
  "Web3js",
  "Solidity",
  "Solana",
  "Aws",
  "DigitalOcean",
  "Jankins",
  "Github",
  "CloudFlare",
];

type GLTFResult_pl = GLTF & {
  nodes: {
    nodejs: THREE.Mesh;
    react: THREE.Mesh;
    python: THREE.Mesh;
    mongodb: THREE.Mesh;
    nestjs: THREE.Mesh;
    vuejs: THREE.Mesh;
    redis: THREE.Mesh;
    reactnative: THREE.Mesh;
    websockets: THREE.Mesh;
    web3: THREE.Mesh;
    solidity: THREE.Mesh;
    solana: THREE.Mesh;
    aws: THREE.Mesh;
    digitalocean: THREE.Mesh;
    jankins: THREE.Mesh;
    github: THREE.Mesh;
    cloudflare: THREE.Mesh;
    profileImg: THREE.Mesh;
  };
  materials: {
    Nodejs: THREE.MeshStandardMaterial;
    React: THREE.MeshStandardMaterial;
    Python: THREE.MeshStandardMaterial;
    Mongodb: THREE.MeshStandardMaterial;
    Nestjs: THREE.MeshStandardMaterial;
    Vuejs: THREE.MeshStandardMaterial;
    ["Redis.001"]: THREE.MeshStandardMaterial;
    ReactNative: THREE.MeshStandardMaterial;
    WebSockets: THREE.MeshStandardMaterial;
    Web3js: THREE.MeshStandardMaterial;
    Solidity: THREE.MeshStandardMaterial;
    Solana: THREE.MeshStandardMaterial;
    Aws: THREE.MeshStandardMaterial;
    DigitalOcean: THREE.MeshStandardMaterial;
    Jankins: THREE.MeshStandardMaterial;
    Github: THREE.MeshStandardMaterial;
    CloudFlare: THREE.MeshStandardMaterial;
    profileImg: THREE.MeshStandardMaterial;
  };
};

function ProgrammingLanguageSpear(props: any) {
  const elRef = useRef<any>(null);

  const [proVec, setProVec] = useState(props.posVec);

  const [rotVec, setRotVec] = useState([Math.PI / 2, 0, 0]);
  const [scale, setScale] = useState(0);
  const [finalScale, setFinalScale] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setFinalScale(0.4);
    }, 100 * props.index);
  }, [props.index]);

  const [scaleVel, setScaleVel] = useState(0.1);

  useFrame(() => {
    // tract mouse movement

    if (props.isHoverActive) {
      setRotVec([Math.PI / 2, 0, rotVec[2] + Math.PI / 50]);
    } else {
      setRotVec([Math.PI / 2, 0, 0]);
    }

    if (props.isHoverActive && scale != finalScale * 1.2) {
      setScale(scale + scaleVel * (finalScale * 1.2 - scale));
    }
    if (!props.isHoverActive && scale != finalScale) {
      setScale(scale + scaleVel * (finalScale - scale));
    }
  });

  return (
    <group
      ref={elRef}
      {...props}
      position={proVec}
      dispose={null}
      scale={[scale, scale, scale]}
      rotation={rotVec}
    >
      <mesh
        // @ts-ignore
        geometry={props.nodes[pl_nodesList[props.index]].geometry}
        // @ts-ignore
        material={props.materials[pl_meterialList[props.index]]}
      />
    </group>
  );
}

function Spinner(props: any) {
  const ref = useRef(null);

  const [opac, setOpac] = useState(0.5);

  useAnimationFrame((time) => {
    setOpac(opac + 0.01);
    if (opac > 1) {
      setOpac(0.5);
    }
  });

  return (
    <div className={styles.Spinner}>
      <img
        className={styles.SpinnerImg}
        style={{ width: "10rem" }}
        src={"/logo.png"}
        alt="spinner"
      />
      <h4 style={{ display: "block" }}>Loading...</h4>
    </div>
  );
}
