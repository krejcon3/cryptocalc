function jednoducha_faktorizace(cislo) {
	// odmocnina z cisla pro nalezeni horni hranice
	var horni_hranice = Math.sqrt(cislo);

	// nalezeni vsech prvocisel mensich nez hranice
	var testovana_prvocisla = najdi_nizsi_prvocisla(horni_hranice).reverse();

	//odeberu jedničku (je na konci)
	testovana_prvocisla.pop();

	// zkouseni prvocisel jedno po druhem
	for (var i = 0; i < testovana_prvocisla.length; i++) {
		if (cislo % testovana_prvocisla[i] === 0) {
			return [testovana_prvocisla[i], cislo / testovana_prvocisla[i]]
		}
	}
}

function najdi_nizsi_prvocisla(cislo) {
	var dolni_index = 0;
	var horni_index = prvocisla_do_milionu.length - 1;
	var testovany_index = Math.floor((dolni_index + horni_index) / 2);
	while (dolni_index < horni_index) {
		if (prvocisla_do_milionu[testovany_index] < cislo && prvocisla_do_milionu[testovany_index + 1] > cislo) break;
		if (prvocisla_do_milionu[testovany_index] > cislo) {
			horni_index = testovany_index;
		}
		if (prvocisla_do_milionu[testovany_index + 1] < cislo) {
			dolni_index = testovany_index;
		}
		testovany_index = Math.floor((dolni_index + horni_index) / 2);
	}

	return prvocisla_do_milionu.slice(0, testovany_index + 1);
}

// funkce pro nalezeni prvocisel hrubou silou
function najdi_prvocisla_do(limit) {
	var prvocisla = [2];
	for (var i = 3; i < limit; i += 2) {
		var je_to_prvocislo = true;
		for (var j = 0; j < prvocisla.length; j++) {
			if (i % prvocisla[j] === 0) {
				je_to_prvocislo = false;
				break;
			}
		}
		if (je_to_prvocislo) {
			prvocisla.push(i);
		}
	}
	prvocisla.unshift(1);
	return prvocisla;
}

// funkce pro nalezeni Bezoutovy rovnosti pomocí rozsireneho euklidova algoritmu
function nsd(a, b) {
	if (b === 0) {
		return {"a": a, "b": b, "d": a, "alpha": 1, "beta": 0};
	}

	var ta = a;
	var tb = b;
	var alpha2 = 1;
	var alpha1 = 0;
	var beta2 = 0;
	var beta1 = 1;
	var vypocet = 0;
	var zbytek = 0;

	while (tb > 0) {
		zbytek = ta % tb;
		vypocet = (ta - zbytek) / tb;

		var alpha2_temp = alpha2;
		alpha2 = alpha1;
		alpha1 = alpha2_temp - vypocet * alpha1;

		var beta2_temp = beta2;
		beta2 = beta1;
		beta1 = beta2_temp - vypocet * beta1;

		ta = tb;
		tb = zbytek;
	}
	return {"a": a, "b": b, "d": ta, "alpha": alpha2, "beta": beta2}
}

document.getElementById("factorization").addEventListener("submit", function (ev) {
	ev.preventDefault();
	var value = parseInt(document.getElementById("factorization_number").value);
	if (value > 0) {
		writeResult("Výsledkem faktorizace čísla " + value + " jsou čísla " + jednoducha_faktorizace(value).join(", ") + ".");
	} else {
		writeResult("Neplatný formát zadaného čísla. Zadali jste " + value);
	}
});

document.getElementById("nsd").addEventListener("submit", function (ev) {
	ev.preventDefault();
	var a = parseInt(document.getElementById("nsd_a").value);
	var b = parseInt(document.getElementById("nsd_b").value);

	if (a < 0 || b < 0) {
		writeResult("Jedno ze zadaných čísel je menších než nula.");
		return;
	}

	var result;
	if (a > b) {
		result = nsd(a, b);
	} else {
		result = nsd(b, a);
	}
	writeResult("Výsledkem rozsireneho euklidovat algoritmu pro cisla " + result.a + " a " + result.b +" je Bezoutova rovnost " + result.d + " rovná se " + result.alpha + " krát " + result.a + " plus " + result.beta + " krát " + result.b);

});

function writeResult(r) {
	var element = document.getElementById("res").innerText = r;
	element.select();
	document.execCommand("copy");
}
