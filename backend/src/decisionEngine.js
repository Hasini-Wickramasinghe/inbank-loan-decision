function calculateScore(modifier, amount, period){
    return (modifier / amount) * period
}

function getUserType(personalCode){
    if (personalCode === "49002010965") return "debt";
    if (personalCode === "49002010976") return "segment1";
    if (personalCode === "49002010987") return "segment2";
    if (personalCode === "49002010998") return "segment3";
    return "unknown";
}