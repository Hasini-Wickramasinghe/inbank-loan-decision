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

function getCreditModifier(userType){
    if (userType === "segment1") return 100;
    if (userType === "segment2") return 300;
    if (userType === "segment3") return 1000;
    return 0;
}


function findBestLoan(modifier, requestedAmount, requestedPeriod) {
    let bestAmount = 0;
    let bestPeriod = 0;

    // Step 1: Try requested period
    for (let amount = 10000; amount >= 2000; amount -= 100) {
        const score = calculateScore(modifier, amount, requestedPeriod);
        if (score >= 1) {
            bestAmount = amount;
            bestPeriod = requestedPeriod;
            break;
        }
    }

    // Step 2: Try other periods
    if (bestAmount === 0) {
        for (let period = 60; period >= 12; period--) {
            for (let amount = 10000; amount >= 2000; amount -= 100) {
                const score = calculateScore(modifier, amount, period);
                if (score >= 1) {
                    bestAmount = amount;
                    bestPeriod = period;
                    break;
                }
            }
            if (bestAmount !== 0) break;
        }
    }

    if (bestAmount > 0) {
        const decision = bestAmount >= requestedAmount ? "positive" : "negative";
        return { decision, amount: bestAmount, period: bestPeriod };
    }

    return { decision: "negative", amount: 0, period: 0 };
}

function evaluateLoan(personalCode, amount, period) {
    const userType = getUserType(personalCode);

    if (userType === "debt" || getCreditModifier(userType) === 0) {
        return { decision: "negative", amount: 0, period: 0 };
    }

    const modifier = getCreditModifier(userType);
    return findBestLoan(modifier, amount, period);
}

module.exports = { evaluateLoan };