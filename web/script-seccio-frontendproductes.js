
class ObjSeccioFrontendProductes {

    constructor () {
    }

    async iniciaSeccio () {
        let refLoading = document.getElementById('productesLoading'),
            refContinguts = document.getElementById('productesContinguts'),
            objRebut = null,
            valor = null,
            codiHTML = '',
            cntProducte = 0,
			imatges = []

        // Amaguem els continguts actuals i mostrem la càrrega
        refContinguts.style.display = 'none'
        refLoading.style.display = 'flex'

        // Demanem el llistat de productes al servidor
        objRebut = await promiseCallServer('POST', '/call/llistatProductes', {})

        // Transformem l'objecte rebut en codi HTML
        if (objRebut.resultat === 'ok') {
            for (cntProducte = 0; cntProducte < objRebut.missatge.length; cntProducte = cntProducte + 1) {
                valor = objRebut.missatge[cntProducte]
				imatges=JSON.parse(valor.imatge)
				codiHTML = codiHTML + '<div class="producte">'
				codiHTML = codiHTML + '<div class="imatgesProducte">'
				codiHTML = codiHTML + '<div class="fletxaImatgesProducte" onclick="seccioFrontendProductes.canviImatge(\'anterior\','+cntProducte+')">&lt;</div>'
				codiHTML = codiHTML + '<img id="p'+cntProducte+'i0" src="' + imatges[0] + '" width="100" />'
				codiHTML = codiHTML + '<img id="p'+cntProducte+'i1" src="' + imatges[1] + '" class="none" width="100" />'
				codiHTML = codiHTML + '<img id="p'+cntProducte+'i2" src="' + imatges[2] + '" class="none" width="100" />'
				codiHTML = codiHTML + '<div class="fletxaImatgesProducte" onclick="seccioFrontendProductes.canviImatge(\'seguent\','+cntProducte+')">&gt;</div>'
				codiHTML = codiHTML + '</div>'  

                codiHTML = codiHTML + '<h3 onclick=\'navegacio.canviaSeccio("frontendProducte&' + valor.id + '")\'>' + valor.nom +'</h3>'
                codiHTML = codiHTML + '<div>' + valor.descripcio +'</div>'
                codiHTML = codiHTML + '<div>' + valor.preu +' €</div>'
                codiHTML = codiHTML + '</div>'
            }
        }

        // Amaguem la càrrega i mostrem el llistat de productes
        refContinguts.innerHTML = codiHTML
        refContinguts.style.display = 'flex'
        refLoading.style.display = 'none'
    }
	canviImatge(direccio,producte){
		let ref0=document.getElementById('p'+producte+'i0'),
			ref1=document.getElementById('p'+producte+'i1'),
			ref2=document.getElementById('p'+producte+'i2'),
			sty0=window.getComputedStyle(ref0,''),
			sty1=window.getComputedStyle(ref1,''),
			sty2=window.getComputedStyle(ref2,''),
			dis0=sty0.getPropertyValue('display'),
			dis1=sty1.getPropertyValue('display'),
			dis2=sty2.getPropertyValue('display'),
			img=-1

		if(dis0!='none') {
			img=0
			ref0.style.display='none'
		}
		if(dis1!='none') {
			img=1
			ref1.style.display='none'
		}
		if(dis2!='none') {
			img=2
			ref2.style.display='none'
		}

		if(direccio=='anterior'){
			if(img==0) img=2
			else if(img==1) img=0
			else if(img==2) img=1
		}
		if(direccio=='seguent'){
			if(img==0) img=1
			else if(img==1) img=2
			else if(img==2) img=0
		}

		if(img==0) ref0.style.display='flex'
		if(img==1) ref1.style.display='flex'
		if(img==2) ref2.style.display='flex'
		}

}