import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export default function Mapinha() {
    const centroInicial = [-22.913933, -47.00];
    const [posicao, setPosicao] = useState();
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (!("geolocation" in navigator)){
            setErro("Seu navegador não tem geolocalização")
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosicao({
                    lat:pos.coords.latitude,
                    lng:pos.coords.longitude,
                });
            },
            () => {
                setErro(" Nao foi possível obter a localização" );
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0,
            }

        );


    },[]);

    const local = [-22.9137900, -47.0681000];
    const zoomInicial = local ? 15 : 13;
    return (
        <section className="mapinha">
            <h1>Mapinha</h1>
            {erro && <div className="erro">{erro}</div>}
            <MapContainer
                center={posicao ? local : centroInicial}
                zoom ={zoomInicial}
                scrollWheelZoom={true}
                className="mapa"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url ="https://{s}.tile.openstreetmap.org/{z}/{x}/{z}.png"/>

                {local && (
                    <Marker position={local}>
                        <Popup>
                            Você está aqui!
                        </Popup>

                    </Marker>
                )}    



            </MapContainer>
        </section>
    );

 }