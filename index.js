const track = document.getElementById("image-track")
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientY;
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt == "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientY;
    const maxDelta = window.innerHeight / 2;
    const percentage = (mouseDelta / maxDelta) * 100;
    const tempNextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(tempNextPercentage, 0), -100);
    track.dataset.percentage = nextPercentage;
    track.animate({
        transform: `translate(-50%, ${nextPercentage}%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `center ${100 + nextPercentage}%`
        }, { duration: 1200, fill: "forwards" });
    }
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
}

