import { Filesystem, Directory} from '@capacitor/filesystem';
import { Toast } from '@capacitor/toast';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "./v_font";
pdfMake.vfs = pdfFonts;

const pdf = (JudulPdf, valueX, quota, Form, jumlahSample, penggantian) => {
  let date = new Date();
  // const dataperRak = [
  //   {rakBtr : 130, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 2, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 2, rakExp : 0, rakDis : 1 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 2, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 1, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 2, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 131, rakInf : 0, rakExp : 0, rakDis : 0 },
  //   {rakBtr : 130, rakInf : 1, rakExp : 1, rakDis : 0 }];
var body = [
          [ 
            { text: 'No', alignment: 'center' },
            { text: 'Jumlah', alignment: 'center' },
            { text: 'Infertile', alignment: 'center' },
            { text: 'Explode', alignment: 'center' },
            { text: 'Dis', alignment: 'center' }
          ]
        ];
var totalBtr = 0;
var totalInf = 0;
var totalExp = 0;
var totalDis = 0;
var totalKL = 0;
Form.map((data, index)=>{
    totalBtr= totalBtr+data.rakBtr;
    totalKL =totalKL+(data.rakBtr-valueX.perRak);
    totalInf= totalInf+data.rakInf;
    totalExp= totalExp+data.rakExp;
    totalDis= totalDis+data.rakDis;
    return body.push([
      { text: index+1, alignment: 'center' },
      { text: data.rakBtr, alignment: 'center' },
      { text: data.rakInf, alignment: 'center' },
      { text: data.rakExp, alignment: 'center' },
      { text: data.rakDis, alignment: 'center' }
    ])
});
body.push([
  { text: 'Total', bold: true, alignment: 'center' },
  { text: totalBtr, bold: true, alignment: 'center' }, 
  { text: totalInf, bold: true, alignment: 'center' }, 
  { text: totalExp, bold: true, alignment: 'center' }, 
  { text: totalDis, bold: true, alignment: 'center' }
]);
var tabel =
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ 50, '*', '*', '*','*' ],

        body: body
      }
    };
var summary = [[
  { text: 'No', alignment: 'center' },
  { text: 'Parameter', alignment: 'center' },
  { text: 'Jumlah', alignment: 'center' },
  { text: 'Persentase', alignment: 'center' }
]];
summary.push(
  [
    { text: '1', alignment: 'center' },
    { text: 'Lebih', alignment: 'center' },
    { text: totalKL > 0 ? totalKL : 0, alignment: 'center' },
    { text: totalKL > 0 && valueX.perRak*Form.length > 0 ? ((totalKL)/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '2', alignment: 'center' },
    { text: 'Kurang', alignment: 'center' },
    { text: totalKL < 0 ? -(totalKL) : 0, alignment: 'center' },
    { text: totalKL < 0 && valueX.perRak*Form.length > 0 ? (-(totalKL)/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '3', alignment: 'center' },
    { text: 'Infertile', alignment: 'center' },
    { text: totalInf, alignment: 'center' },
    { text: valueX.perRak*Form.length > 0 ? (totalInf/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '4', alignment: 'center' },
    { text: 'Explode', alignment: 'center' },
    { text: totalExp, alignment: 'center' },
    { text: valueX.perRak*Form.length > 0 ? (totalExp/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '5', alignment: 'center' },
    { text: 'Dis', alignment: 'center' },
    { text: totalDis, alignment: 'center' },
    { text: valueX.perRak*Form.length > 0 ? (totalDis/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '*', bold: true, alignment: 'center' }, 
    { text: 'Total', bold: true, alignment: 'center' }, 
    { text: totalInf+totalExp+totalDis-totalKL, bold: true, alignment: 'center' }, 
    { text: valueX.perRak*Form.length >0 ? ((totalInf+totalExp+totalDis-totalKL)/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', bold: true, alignment: 'center' }
  ],
  [
    { text: '*', bold: true, alignment: 'center', color : '#A70000' }, 
    { text: 'Penggantian', bold: true, alignment: 'center', color : '#A70000' }, 
    { text: totalKL < 0 ? totalInf+totalExp+totalDis-totalKL : totalInf+totalExp+totalDis, bold: true, alignment: 'center', color : '#A70000' }, 
    { text: valueX.perRak*Form.length > 0 ? totalKL < 0 ? ((totalInf+totalExp+totalDis-totalKL)/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : ((totalInf+totalExp+totalDis)/(valueX.perRak*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', bold: true, alignment: 'center', color : '#A70000' }
  ])
var tabelsummary =
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ 50, '*', '*','*' ],

        body: summary
      }
    };
var dd = {
  info: {
    title: 'Pemusnahan',
    author: 'Antonius Riyanto',
    subject: 'LARTeams',
    keywords: '@CahMagetan',
    },
  footer: { columns: [ { text: '@CalPes', color:'black', opacity:0.5, alignment: 'right', margin: [15,15,15,15] } ] },
	content: [
	    { text: JudulPdf ? JudulPdf : 'Laporan Pelaksanaan Cutting HE' , fontSize: 18, bold: true, decoration:'underline', alignment: 'center', margin: [0,0,0,0] },
	    { text: 'Pengurangan Produksi DOC FS', fontSize: 14, bold: true, alignment: 'center', margin: [0,0,0,0] },
      { text: `( ${date.toLocaleDateString('id-ID')} )`, fontSize: 12, bold: true, alignment: 'center', margin: [0,0,0,25] },
	    {
          columns: [
            {
              width: '50%',
              text: 'Jumlah Quota',
              alignment: 'center',
              fontSize: 14,
              bold: true,
              decoration: 'underline',
              margin:[0,0,0,5],
            },
            {
              width: '50%',
              text: ' Jumlah Sampling',
              alignment: 'center',
              fontSize: 14,
              bold: true,
              decoration: 'underline',
              margin:[0,0,0,5],
            },
          ]
	    },
	    {
          columns: [
            {
              width: '50%',
              text: `${valueX.jumlahKereta} Kereta, ${valueX.jumlahRak} Rak, ${valueX.jumlahButir} Btr`,
              alignment: 'center',
              fontSize: 12,
            },
            {
              width: '50%',
              text: `${Form.length} Rak`,
              alignment: 'center',
              fontSize: 12,
            },
          ]
	    },
	    {
          columns: [
            {
              width: '50%',
              text: `( ${valueX.perRak} / Rak )`,
              alignment: 'center',
              fontSize: 12,
            },
            {
              width: '50%',
              text: `( ${valueX.perRak} / Rak )`,
              alignment: 'center',
              fontSize: 12,
            },
          ]
	    },
	    {
          columns: [
            {
              width: '50%',
              text: `Total : ${quota} Butir`,
              alignment: 'center',
              fontSize: 12,
              bold: true,
              decoration: 'underline',
              margin:[0,5,0,10],
            },
            {
              width: '50%',
              text: `Total : ${valueX.perRak * Form.length} Butir`,
              alignment: 'center',
              fontSize: 12,
              bold: true,
              decoration: 'underline',
              margin:[0,5,0,10],
            },
          ]
	    },
	    { text: 'Detail Sampling', fontSize: 14, bold: true, decoration:'underline', alignment: 'center', margin: [0,0,0,10] },
	    tabel,
	    { text: 'Summary Sampling', fontSize: 14, bold: true, decoration:'underline', alignment: 'center', margin: [0,20,0,10] },
	    tabelsummary,
      { text: 'Note :' , fontSize: 12, margin: [0,0,0,0] },
      { text: '- Jumlah sample lebih tidak dihitung.' , fontSize: 12, margin: [0,0,0,0] },
      { text: '- Jumlah sample kurang tetap dihitung.' , fontSize: 12, margin: [0,0,0,0] },
	    { text: `Penggantian : ${isNaN(penggantian) || penggantian < 0 || jumlahSample == 0? '0' : Math.round(penggantian)} Btr ( ${valueX.perRak == 0 || penggantian< 0 || isNaN(penggantian) || jumlahSample ==0 ? '0' : Math.floor(Math.round(penggantian)/valueX.perRak)} rak, ${ valueX.perRak == 0 || penggantian < 0 || isNaN(penggantian) || jumlahSample==0? '0' : Math.round(penggantian) - (Math.floor(Math.round(penggantian)/valueX.perRak)*valueX.perRak) } btr )`, fontSize: 14, bold: true, decoration:'underline', alignment: 'left', margin: [0,20,0,10] },
	    { text: `Qouta tidak diganti : ${isNaN(penggantian) || penggantian < 0 || jumlahSample == 0 ? ((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) : ((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) - Math.round(penggantian)} Btr`, fontSize: 14, bold: true, decoration:'underline', alignment: 'left', margin: [0,0,0,10] },
	]
}
  // pdfMake.createPdf(dd).download();
  pdfMake.createPdf(dd).getBase64(async (data) => {
    const result = await Filesystem.writeFile({
      path: `pdf/Pemusnahan-${date.toLocaleDateString('id-ID').split('/').join('-')}-${date.getTime()}.pdf`,
      data: data,
      directory: Directory.Documents,
      recursive: true,
    });
    await Toast.show({
      text: result.uri,
      position: 'bottom',
      duration: 'long',
    });
    FileSharer.share({
      filename: `Pemusnahan-${date.toLocaleDateString('id-ID').split('/').join('-')}-${date.getTime()}.pdf`,
      base64Data: data,
      contentType: "application/pdf",
    });
  });
}

const pdf1 = (JudulPdf, valueX, quota, jumlahSample, penggantian) => {
  let date = new Date();
  let totalInf = valueX.infertile;
  let totalExp = valueX.explode;
  let totalDis = valueX.dis;
  let totalKur = valueX.kurang;
  let totalLeb = valueX.lebih;
  console.log(totalInf, jumlahSample)
  let summary = [[
    { text: 'No', alignment: 'center' },
    { text: 'Parameter', alignment: 'center' },
    { text: 'Jumlah', alignment: 'center' },
    { text: 'Persentase', alignment: 'center' }
  ]];
summary.push(
  [
    { text: '1', alignment: 'center' },
    { text: 'Lebih', alignment: 'center' },
    { text: totalLeb, alignment: 'center' },
    { text: jumlahSample > 0 ? (totalLeb/jumlahSample*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '2', alignment: 'center' },
    { text: 'Kurang', alignment: 'center' },
    { text: totalKur, alignment: 'center' },
    { text: jumlahSample > 0 ? (totalKur/jumlahSample*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '3', alignment: 'center' },
    { text: 'Infertile', alignment: 'center' },
    { text: totalInf, alignment: 'center' },
    { text: jumlahSample > 0 ? (totalInf/jumlahSample*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '4', alignment: 'center' },
    { text: 'Explode', alignment: 'center' },
    { text: totalExp, alignment: 'center' },
    { text: jumlahSample > 0 ? (totalExp/jumlahSample*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '5', alignment: 'center' },
    { text: 'Dis', alignment: 'center' },
    { text: totalDis, alignment: 'center' },
    { text: jumlahSample > 0 ? (totalDis/jumlahSample*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
  ],
  [
    { text: '*', bold: true, alignment: 'center' }, 
    { text: 'Total', bold: true, alignment: 'center' }, 
    { text: totalInf+totalExp+totalDis+totalKur-totalLeb, bold: true, alignment: 'center' }, 
    { text: jumlahSample > 0 ? ((totalInf+totalExp+totalDis+totalKur-totalLeb)/jumlahSample*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', bold: true, alignment: 'center' }
  ],
  [
    { text: '*', bold: true, alignment: 'center', color: '#A70000' }, 
    { text: 'Penggantian', bold: true, alignment: 'center', color: '#A70000' }, 
    { text: totalKur-totalLeb > 0 ? totalInf+totalExp+totalDis+totalKur-totalLeb : totalInf+totalExp+totalDis, bold: true, alignment: 'center', color: '#A70000' }, 
    { text: jumlahSample > 0 ? totalKur-totalLeb > 0 ? ((totalInf+totalExp+totalDis+totalKur-totalLeb)/jumlahSample*100).toFixed(2) + ' %' : ((totalInf+totalExp+totalDis)/jumlahSample*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', bold: true, alignment: 'center', color: '#A70000' }
  ])
var tabelsummary =
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ 50, '*', '*','*' ],

        body: summary
      }
    };
var dd = {
  info: {
    title: 'Pemusnahan',
    author: 'Antonius Riyanto',
    subject: 'LARTeams',
    keywords: '@CahMagetan',
    },
  watermark: { text: '@CalPes', color: 'blue', opacity: 0.1, bold: true, italics: false },
  footer: { columns: [ { text: '@CalPes', color:'black', opacity:0.5, alignment: 'right', margin: [15,15,15,15] } ] },
	content: [
	    { text: JudulPdf ? JudulPdf : 'Laporan Pelaksanaan Cutting HE' , fontSize: 18, bold: true, decoration:'underline', alignment: 'center', margin: [0,0,0,0] },
	    { text: 'Pengurangan Produksi DOC FS', fontSize: 14, bold: true, alignment: 'center', margin: [0,0,0,0] },
      { text: `( ${date.toLocaleDateString('id-ID')} )`, fontSize: 12, bold: true, alignment: 'center', margin: [0,0,0,25] },
	    {
          columns: [
            {
              width: '50%',
              text: 'Jumlah Quota',
              alignment: 'center',
              fontSize: 14,
              bold: true,
              decoration: 'underline',
              margin:[0,0,0,5],
            },
            {
              width: '50%',
              text: ' Jumlah Sampling',
              alignment: 'center',
              fontSize: 14,
              bold: true,
              decoration: 'underline',
              margin:[0,0,0,5],
            },
          ]
	    },
	    {
          columns: [
            {
              width: '50%',
              text: `${valueX.jumlahKereta} Kereta, ${valueX.jumlahRak} Rak, ${valueX.jumlahButir} Btr`,
              alignment: 'center',
              fontSize: 12,
            },
            {
              width: '50%',
              text: `${valueX.rakSampling} Rak`,
              alignment: 'center',
              fontSize: 12,
            },
          ]
	    },
	    {
          columns: [
            {
              width: '50%',
              text: `( ${valueX.perRak} / Rak )`,
              alignment: 'center',
              fontSize: 12,
            },
            {
              width: '50%',
              text: `( ${valueX.perRak} / Rak )`,
              alignment: 'center',
              fontSize: 12,
            },
          ]
	    },
	    {
          columns: [
            {
              width: '50%',
              text: `Total : ${quota} Butir`,
              alignment: 'center',
              fontSize: 12,
              bold: true,
              decoration: 'underline',
              margin:[0,5,0,10],
            },
            {
              width: '50%',
              text: `Total : ${jumlahSample} Butir`,
              alignment: 'center',
              fontSize: 12,
              bold: true,
              decoration: 'underline',
              margin:[0,5,0,10],
            },
          ]
	    },
	    { text: 'Sampling', fontSize: 14, bold: true, decoration:'underline', alignment: 'center', margin: [0,20,0,10] },
	    tabelsummary,
      { text: 'Note :' , fontSize: 12, margin: [0,0,0,0] },
      { text: '- Jumlah sample lebih tidak dihitung.' , fontSize: 12, margin: [0,0,0,0] },
      { text: '- Jumlah sample kurang tetap dihitung.' , fontSize: 12, margin: [0,0,0,0] },
	    { text: `Penggantian : ${isNaN(penggantian) || penggantian < 0 || jumlahSample == 0? '0' : Math.round(penggantian)} Btr ( ${valueX.perRak == 0 || penggantian< 0 || isNaN(penggantian) || jumlahSample ==0 ? '0' : Math.floor(Math.round(penggantian)/valueX.perRak)} rak, ${ valueX.perRak == 0 || penggantian < 0 || isNaN(penggantian) || jumlahSample==0? '0' : Math.round(penggantian) - (Math.floor(Math.round(penggantian)/valueX.perRak)*valueX.perRak) } btr )`, fontSize: 14, bold: true, decoration:'underline', alignment: 'left', margin: [0,20,0,10] },
	    { text: `Qouta tidak diganti : ${isNaN(penggantian) || penggantian < 0 || jumlahSample == 0 ? ((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) : ((valueX.jumlahKereta*valueX.perKereta*valueX.perRak)+(valueX.jumlahRak*valueX.perRak)+valueX.jumlahButir) - Math.round(penggantian)} Btr`, fontSize: 14, bold: true, decoration:'underline', alignment: 'left', margin: [0,0,0,10] },
      { text: `Powered By : @cahMagetan`, fontSize: 8, decoration: 'underline', italics: true, bold: true, alignment: 'center', margin: [0,250,0,0] },
	]
}
  // pdfMake.createPdf(dd).download();
  pdfMake.createPdf(dd).getBase64(async (data) => {
    const result = await Filesystem.writeFile({
      path: `pdf/Pemusnahan-${date.toLocaleDateString('id-ID').split('/').join('-')}-${date.getTime()}.pdf`,
      data: data,
      directory: Directory.Documents,
      recursive: true,
    });
    await Toast.show({
      text: result.uri,
      position: 'bottom',
      duration: 'long',
    });
    FileSharer.share({
      filename: `Pemusnahan-${date.toLocaleDateString('id-ID').split('/').join('-')}-${date.getTime()}.pdf`,
      base64Data: data,
      contentType: "application/pdf",
    });
  });
}

const pdf2 = (JudulPdf, valueX, quota, Form, jumlahSample, penggantian, rata) => {
  let date = new Date();
  var body = [
            [ 
              { text: 'No', alignment: 'center' },
              { text: 'Jumlah', alignment: 'center' },
              { text: 'Infertile', alignment: 'center' },
              { text: 'Explode', alignment: 'center' },
              { text: 'Dis', alignment: 'center' }
            ]
          ];
  var totalBtr = 0;
  var totalInf = 0;
  var totalExp = 0;
  var totalDis = 0;
  var totalKL = 0;
  Form.map((data, index)=>{
      totalBtr= totalBtr+data.rakBtr;
      totalKL =totalKL+(data.rakBtr-rata);
      totalInf= totalInf+data.rakInf;
      totalExp= totalExp+data.rakExp;
      totalDis= totalDis+data.rakDis;
      return body.push([
        { text: index+1, alignment: 'center' },
        { text: data.rakBtr, alignment: 'center' },
        { text: data.rakInf, alignment: 'center' },
        { text: data.rakExp, alignment: 'center' },
        { text: data.rakDis, alignment: 'center' }
      ])
  });
  body.push([
    { text: 'Total', bold: true, alignment: 'center' },
    { text: totalBtr, bold: true, alignment: 'center' }, 
    { text: totalInf, bold: true, alignment: 'center' }, 
    { text: totalExp, bold: true, alignment: 'center' }, 
    { text: totalDis, bold: true, alignment: 'center' }
  ]);
  var tabel =
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ 50, '*', '*', '*','*' ],

          body: body
        }
      };
  var summary = [[
    { text: 'No', alignment: 'center' },
    { text: 'Parameter', alignment: 'center' },
    { text: 'Jumlah', alignment: 'center' },
    { text: 'Persentase', alignment: 'center' }
  ]];
  summary.push(
    [
      { text: '1', alignment: 'center' },
      { text: 'Lebih', alignment: 'center' },
      { text: totalKL > 0 ? totalKL : 0, alignment: 'center' },
      { text: totalKL > 0 && rata*Form.length > 0 ? ((totalKL)/(rata*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
    ],
    [
      { text: '2', alignment: 'center' },
      { text: 'Kurang', alignment: 'center' },
      { text: totalKL < 0 ? -(totalKL) : 0, alignment: 'center' },
      { text: totalKL < 0 && rata*Form.length > 0 ? (-(totalKL)/(rata*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
    ],
    [
      { text: '3', alignment: 'center' },
      { text: 'Infertile', alignment: 'center' },
      { text: totalInf, alignment: 'center' },
      { text: rata*Form.length > 0 ? (totalInf/(rata*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
    ],
    [
      { text: '4', alignment: 'center' },
      { text: 'Explode', alignment: 'center' },
      { text: totalExp, alignment: 'center' },
      { text: rata*Form.length > 0 ? (totalExp/(rata*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
    ],
    [
      { text: '5', alignment: 'center' },
      { text: 'Dis', alignment: 'center' },
      { text: totalDis, alignment: 'center' },
      { text: rata*Form.length > 0 ? (totalDis/(rata*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', alignment: 'center' }
    ],
    [
      { text: '*', bold: true, alignment: 'center' }, 
      { text: 'Total', bold: true, alignment: 'center' }, 
      { text: totalInf+totalExp+totalDis-totalKL, bold: true, alignment: 'center' }, 
      { text: rata*Form.length > 0 ? ((totalInf+totalExp+totalDis-totalKL)/(rata*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', bold: true, alignment: 'center' }
    ],
    [
      { text: '*', bold: true, alignment: 'center', color : '#A70000' }, 
      { text: 'Penggantian', bold: true, alignment: 'center', color : '#A70000' }, 
      { text: totalKL < 0 ? totalInf+totalExp+totalDis-totalKL : totalInf+totalExp+totalDis, bold: true, alignment: 'center', color : '#A70000' }, 
      { text: rata*Form.length > 0 ? totalKL < 0 ? ((totalInf+totalExp+totalDis-totalKL)/(rata*Form.length)*100).toFixed(2) + ' %' : ((totalInf+totalExp+totalDis)/(rata*Form.length)*100).toFixed(2) + ' %' : (0).toFixed(2) + ' %', bold: true, alignment: 'center', color : '#A70000' }
    ])
  var tabelsummary =
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ 50, '*', '*','*' ],

          body: summary
        }
      };
  var dd = {
    info: {
      title: 'Pemusnahan',
      author: 'Antonius Riyanto',
      subject: 'LARTeams',
      keywords: '@CahMagetan',
      },
    footer: { columns: [ { text: '@CalPes', color:'black', opacity:0.5, alignment: 'right', margin: [15,15,15,15] } ] },
    content: [
      { text: JudulPdf ? JudulPdf : 'Laporan Pelaksanaan Cutting HE' , fontSize: 18, bold: true, decoration:'underline', alignment: 'center', margin: [0,0,0,0] },
      { text: 'Pengurangan Produksi DOC FS', fontSize: 14, bold: true, alignment: 'center', margin: [0,0,0,0] },
      { text: `( ${date.toLocaleDateString('id-ID')} )`, fontSize: 12, bold: true, alignment: 'center', margin: [0,0,0,25] },
      {
        columns: [
          {
            width: '50%',
            text: 'Jumlah Quota',
            alignment: 'center',
            fontSize: 14,
            bold: true,
            decoration: 'underline',
            margin:[0,0,0,5],
          },
          {
            width: '50%',
            text: ' Jumlah Sampling',
            alignment: 'center',
            fontSize: 14,
            bold: true,
            decoration: 'underline',
            margin:[0,0,0,5],
          },
        ]
      },
      {
        columns: [
          {
            width: '50%',
            text: `${quota} Btr`,
            alignment: 'center',
            fontSize: 12,
          },
          {
            width: '50%',
            text: `${Form.length} Rak (rata-rata : ${rata} Btr)`,
            alignment: 'center',
            fontSize: 12,
          },
        ]
      },
      {
        columns: [
          {
            width: '50%',
            text: `Total : ${quota} Butir`,
            alignment: 'center',
            fontSize: 12,
            bold: true,
            decoration: 'underline',
            margin:[0,5,0,10],
          },
          {
            width: '50%',
            text: `Total : ${rata * Form.length} Butir`,
            alignment: 'center',
            fontSize: 12,
            bold: true,
            decoration: 'underline',
            margin:[0,5,0,10],
          },
        ]
      },
      { text: 'Detail Sampling', fontSize: 14, bold: true, decoration:'underline', alignment: 'center', margin: [0,0,0,10] },
      tabel,
      { text: 'Summary Sampling', fontSize: 14, bold: true, decoration:'underline', alignment: 'center', margin: [0,20,0,10] },
      tabelsummary,
      { text: 'Note :' , fontSize: 12, margin: [0,0,0,0] },
      { text: '- Jumlah sample lebih tidak dihitung.' , fontSize: 12, margin: [0,0,0,0] },
      { text: '- Jumlah sample kurang tetap dihitung.' , fontSize: 12, margin: [0,0,0,0] },
      { text: `Penggantian : ${isNaN(penggantian) || penggantian < 0 || jumlahSample == 0 ? '0' : Math.round(penggantian)} Btr ( ${rata == 0 || penggantian< 0 || isNaN(penggantian) || jumlahSample ==0 ? '0' : Math.floor(Math.round(penggantian)/rata)} rak@${rata}btr + ${ rata == 0 || penggantian < 0 || isNaN(penggantian) || jumlahSample==0? '0' : Math.round(penggantian) - (Math.floor(Math.round(penggantian)/rata)*rata) } btr )`, fontSize: 14, bold: true, decoration:'underline', alignment: 'left', margin: [0,20,0,10] },
      { text: `Qouta tidak diganti : ${isNaN(penggantian) || penggantian < 0 || jumlahSample == 0 ? (quota) : (quota - Math.round(penggantian))} Btr`, fontSize: 14, bold: true, decoration:'underline', alignment: 'left', margin: [0,0,0,10] },
      { text: `Powered By : @cahMagetan`, fontSize: 8, decoration: 'underline', italics: true, bold: true, alignment: 'center', margin: [0,30,0,0] },
    ]
  }
  // pdfMake.createPdf(dd).download();
  pdfMake.createPdf(dd).getBase64(async (data) => {
    const result = await Filesystem.writeFile({
      path: `pdf/Pemusnahan-${date.toLocaleDateString('id-ID').split('/').join('-')}-${date.getTime()}.pdf`,
      data: data,
      directory: Directory.Documents,
      recursive: true,
    });
    await Toast.show({
      text: result.uri,
      position: 'bottom',
      duration: 'long',
    });
    FileSharer.share({
      filename: `Pemusnahan-${date.toLocaleDateString('id-ID').split('/').join('-')}-${date.getTime()}.pdf`,
      base64Data: data,
      contentType: "application/pdf",
    });
  });
}

export {pdf, pdf1, pdf2};