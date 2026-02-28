
//

const benchmark = (): "low" | "mid" | "high" => {
    const start = performance.now();
    let x = 0;
    for (let i = 0; i < 1_000_000; i++) x += Math.sqrt(i);
    const elapsed = performance.now() - start;

    if (elapsed < 20) return "high";
    if (elapsed < 60) return "mid";
    return "low";
}

//

export default { benchmark }
