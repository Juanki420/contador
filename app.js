var _0x3ff9ee=_0x39ea;(function(_0x148944,_0x2262aa){var _0xf0ae83=_0x39ea,_0x47270d=_0x148944();while(!![]){try{var _0x4fa332=-parseInt(_0xf0ae83(0x1cd))/0x1*(parseInt(_0xf0ae83(0x1d2))/0x2)+parseInt(_0xf0ae83(0x1a6))/0x3+-parseInt(_0xf0ae83(0x18c))/0x4*(parseInt(_0xf0ae83(0x1cf))/0x5)+parseInt(_0xf0ae83(0x1d0))/0x6+parseInt(_0xf0ae83(0x1d3))/0x7+-parseInt(_0xf0ae83(0x1d7))/0x8*(-parseInt(_0xf0ae83(0x1dd))/0x9)+-parseInt(_0xf0ae83(0x1ba))/0xa;if(_0x4fa332===_0x2262aa)break;else _0x47270d['push'](_0x47270d['shift']());}catch(_0x366a55){_0x47270d['push'](_0x47270d['shift']());}}}(_0x2b73,0x9aaa2));var firebaseConfig={'apiKey':_0x3ff9ee(0x1bf),'authDomain':_0x3ff9ee(0x195),'databaseURL':_0x3ff9ee(0x1a4),'projectId':'contador-c6528','storageBucket':'contador-c6528.appspot.com','messagingSenderId':_0x3ff9ee(0x1bd),'appId':'1:575749501934:web:4b48ebab36b25e925914ff'},allowedEmails=[_0x3ff9ee(0x1c1),_0x3ff9ee(0x199),_0x3ff9ee(0x1bc)];firebase[_0x3ff9ee(0x1b2)](firebaseConfig);var nameList=document['getElementById'](_0x3ff9ee(0x1cc)),nameRef=firebase[_0x3ff9ee(0x1a5)]()[_0x3ff9ee(0x1ad)](_0x3ff9ee(0x1ca)),userMessagesRef=firebase[_0x3ff9ee(0x1a5)]()[_0x3ff9ee(0x1ad)](_0x3ff9ee(0x1c7)),canSubmitNames=!![];nameRef['on'](_0x3ff9ee(0x1b5),handleNameChange),nameRef['on'](_0x3ff9ee(0x1da),handleNameChange);function handleNameChange(_0x31c248){var _0x1f7d07=_0x3ff9ee,_0x170837=_0x31c248[_0x1f7d07(0x193)]();console[_0x1f7d07(0x18d)](_0x1f7d07(0x192),_0x170837[_0x1f7d07(0x1e0)]),console['log'](_0x1f7d07(0x1a9),_0x170837[_0x1f7d07(0x1b1)]),console[_0x1f7d07(0x18d)](_0x1f7d07(0x1d8),_0x170837['userName']),console[_0x1f7d07(0x18d)]('Correo\x20Electrónico\x20del\x20Usuario:',_0x170837[_0x1f7d07(0x191)]);var _0x21080d=document[_0x1f7d07(0x19b)]('li');_0x21080d[_0x1f7d07(0x189)]=_0x170837['name'],nameList[_0x1f7d07(0x1c4)](_0x21080d);}function isAllowedUser(){var _0x236b70=_0x3ff9ee,_0x350714=firebase[_0x236b70(0x1de)]()[_0x236b70(0x1c3)];return _0x350714&&_0x350714[_0x236b70(0x19c)][0x0]?.[_0x236b70(0x1a8)]==='google.com'&&_0x350714[_0x236b70(0x198)]===_0x236b70(0x1c9);}function hasUserSubmittedMessage(_0x16a9f4){var _0x3632a5=_0x3ff9ee;return userMessagesRef[_0x3632a5(0x1b0)](_0x16a9f4)[_0x3632a5(0x1e2)](_0x3632a5(0x1a2))['then'](function(_0x692ac){var _0x4699e2=_0x3632a5;return _0x692ac[_0x4699e2(0x1e6)]();});}function markUserAsSubmitted(_0x2af033){var _0x21d024=_0x3ff9ee;userMessagesRef[_0x21d024(0x1b0)](_0x2af033)[_0x21d024(0x1b4)](!![]);}function handleFormSubmission(_0x19db34){var _0x5819ac=_0x3ff9ee;_0x19db34['preventDefault']();var _0x475978=firebase[_0x5819ac(0x1de)]()[_0x5819ac(0x1c3)];if(!_0x475978){alert(_0x5819ac(0x1b7));return;}hasUserSubmittedMessage(_0x475978[_0x5819ac(0x198)])['then'](function(_0x12f8fd){var _0x452cb4=_0x5819ac;if(_0x12f8fd)alert(_0x452cb4(0x1db));else{if(!canSubmitNames){alert('Recargue\x20la\x20página\x20y\x20envíe\x20de\x20nuevo.');return;}var _0x1d44f2=document[_0x452cb4(0x1e1)](_0x452cb4(0x1c8)),_0xabe389=_0x1d44f2[_0x452cb4(0x1a2)][_0x452cb4(0x19f)]();if(_0xabe389['length']===0x0||_0xabe389[_0x452cb4(0x1ce)]>0x1e){alert(_0x452cb4(0x1cb));return;}isNameAlreadySubmitted(_0xabe389)[_0x452cb4(0x1e5)](function(_0x2afadf){var _0x3089c2=_0x452cb4;if(_0x2afadf)alert('Este\x20nombre\x20ya\x20ha\x20sido\x20enviado.\x20Por\x20favor,\x20elige\x20otro.');else{canSubmitNames=![];var _0x20439c={'name':_0xabe389,'userId':_0x475978[_0x3089c2(0x198)],'userName':_0x475978[_0x3089c2(0x18b)],'userEmail':_0x475978[_0x3089c2(0x188)]},_0x56dca9=nameRef[_0x3089c2(0x1b4)](_0x20439c);markUserAsSubmitted(_0x475978[_0x3089c2(0x198)]),_0x1d44f2['value']='',alert(_0x3089c2(0x1d9));}});}});}function isNameAlreadySubmitted(_0x49e376){var _0xcb2ecd=_0x3ff9ee;return nameRef[_0xcb2ecd(0x1e3)](_0xcb2ecd(0x1e0))[_0xcb2ecd(0x19a)](_0x49e376)['once'](_0xcb2ecd(0x1a2))[_0xcb2ecd(0x1e5)](function(_0x14616f){return _0x14616f['exists']();});}function resetUserMessages(){var _0x4c8cc6=_0x3ff9ee,_0x21de8f=firebase[_0x4c8cc6(0x1de)]()['currentUser'];_0x21de8f&&isAllowedUser()?(userMessagesRef[_0x4c8cc6(0x19e)]()[_0x4c8cc6(0x1e5)](function(){var _0x2e04d0=_0x4c8cc6;console[_0x2e04d0(0x18d)]('Todos\x20los\x20mensajes\x20de\x20usuarios\x20han\x20sido\x20eliminados.');})[_0x4c8cc6(0x1ae)](function(_0x19d690){var _0x43c13b=_0x4c8cc6;console[_0x43c13b(0x18a)](_0x43c13b(0x18f),_0x19d690);}),alert(_0x4c8cc6(0x18e))):alert(_0x4c8cc6(0x1a7));}function resetNames(){var _0x32100f=_0x3ff9ee,_0x479916=firebase[_0x32100f(0x1de)]()[_0x32100f(0x1c3)];_0x479916&&isAllowedUser()?(nameRef[_0x32100f(0x19e)]()[_0x32100f(0x1e5)](function(){var _0x4538be=_0x32100f;console[_0x4538be(0x18d)](_0x4538be(0x1b3));})[_0x32100f(0x1ae)](function(_0x197799){var _0x365984=_0x32100f;console['error'](_0x365984(0x1d6),_0x197799);}),canSubmitNames=!![],alert(_0x32100f(0x197))):alert(_0x32100f(0x1be));}function resetAllData(){var _0x561074=_0x3ff9ee,_0x1bcfa5=firebase[_0x561074(0x1de)]()[_0x561074(0x1c3)];_0x1bcfa5&&isAllowedUser()?(nameRef[_0x561074(0x19e)]()[_0x561074(0x1e5)](function(){var _0x46ed8c=_0x561074;console[_0x46ed8c(0x18d)](_0x46ed8c(0x1b3));})['catch'](function(_0x1cb4a3){var _0x2a41e3=_0x561074;console[_0x2a41e3(0x18a)](_0x2a41e3(0x1d6),_0x1cb4a3);}),userMessagesRef[_0x561074(0x19e)]()[_0x561074(0x1e5)](function(){var _0x168d52=_0x561074;console[_0x168d52(0x18d)](_0x168d52(0x1af));})[_0x561074(0x1ae)](function(_0x4de84b){var _0x352b58=_0x561074;console[_0x352b58(0x18a)](_0x352b58(0x18f),_0x4de84b);}),canSubmitNames=!![],alert(_0x561074(0x1c5))):alert('No\x20tienes\x20permisos\x20para\x20restablecer\x20los\x20envíos\x20o\x20no\x20has\x20iniciado\x20sesión.');}function logout(){var _0x50254c=_0x3ff9ee;firebase[_0x50254c(0x1de)]()['signOut']()[_0x50254c(0x1e5)](function(){var _0xf30f7e=_0x50254c;alert(_0xf30f7e(0x1c6));})['catch'](function(_0x156629){var _0x4c8a6e=_0x50254c;alert('Error\x20al\x20cerrar\x20sesión:\x20'+_0x156629[_0x4c8a6e(0x1c0)]);});}function _0x2b73(){var _0x5d1d30=['8253747PMtCvf','auth','emailLoginButton','name','getElementById','once','orderByChild','onAuthStateChanged','then','exists','resetUserMessagesButton','email','innerText','error','displayName','4RBfewj','log','Se\x20ha\x20restablecido\x20la\x20información\x20de\x20los\x20mensajes\x20de\x20usuarios.','Error\x20al\x20eliminar\x20los\x20mensajes\x20de\x20usuarios:','No\x20hay\x20nombres\x20disponibles\x20para\x20elegir.','userEmail','Nombre:','val','none','contador-c6528.firebaseapp.com','registerButton','Se\x20han\x20restablecido\x20todos\x20los\x20envíos\x20de\x20nombres.','uid','usuario2@example.com','equalTo','createElement','providerData','spinButton','remove','trim','innerHTML','userInfo','value','addEventListener','https://contador-c6528-default-rtdb.europe-west1.firebasedatabase.app','database','1109205nzSQMO','No\x20tienes\x20permisos\x20para\x20restablecer\x20los\x20mensajes\x20de\x20usuarios\x20o\x20no\x20has\x20iniciado\x20sesión.','providerId','ID\x20de\x20Usuario:','Error\x20al\x20obtener\x20nombres:','style','resetNamesButton','ref','catch','Todos\x20los\x20mensajes\x20de\x20usuarios\x20han\x20sido\x20eliminados.','child','userId','initializeApp','Todos\x20los\x20nombres\x20han\x20sido\x20eliminados.','push','child_added','display','Debes\x20iniciar\x20sesión\x20antes\x20de\x20enviar\x20un\x20nombre.','¡Has\x20iniciado\x20sesión\x20con\x20Google\x20correctamente!','GoogleAuthProvider','11747400OjZUcE','click','usuario3@example.com','575749501934','No\x20tienes\x20permisos\x20para\x20restablecer\x20los\x20envíos\x20de\x20nombres\x20o\x20no\x20has\x20iniciado\x20sesión.','AIzaSyC5FR4fLXV1zjAzZ4WFIwBG97Aes3FtPWo','message','usuario1@example.com','signInWithPopup','currentUser','appendChild','Se\x20han\x20restablecido\x20todos\x20los\x20envíos\x20y\x20mensajes\x20de\x20usuarios.','Has\x20cerrado\x20sesión\x20correctamente.','userMessages','nameInput','EcjgireoyRNjZ7Fo3W3eMZT05jp1','names','Por\x20favor,\x20ingresa\x20un\x20nombre\x20válido\x20(máximo\x2030\x20caracteres).','nameList','303934siuUmc','length','4302185lDGrJQ','7193130tFSEep','forEach','6QnGExt','7663684JPiKwK','resetButton','loginButton','Error\x20al\x20eliminar\x20los\x20nombres:','8oAPXeQ','Nombre\x20de\x20Usuario:','Su\x20nombre\x20ha\x20sido\x20enviado.\x20Si\x20no\x20lo\x20ve,\x20por\x20favor,\x20recargue\x20la\x20página.','child_changed','Ya\x20has\x20enviado\x20un\x20mensaje.\x20No\x20puedes\x20enviar\x20otro.','block'];_0x2b73=function(){return _0x5d1d30;};return _0x2b73();}function _0x39ea(_0x2c7285,_0x5d0b0e){var _0x2b733f=_0x2b73();return _0x39ea=function(_0x39ea3d,_0x2be85a){_0x39ea3d=_0x39ea3d-0x188;var _0x20cf16=_0x2b733f[_0x39ea3d];return _0x20cf16;},_0x39ea(_0x2c7285,_0x5d0b0e);}function displayUserInfo(_0x35f82b){var _0xd974df=_0x3ff9ee,_0x4c90ed=document[_0xd974df(0x1e1)](_0xd974df(0x1a1)),_0x2ca50e=document['getElementById'](_0xd974df(0x19d));if(_0x4c90ed){_0x4c90ed[_0xd974df(0x1a0)]=_0x35f82b?'Usuario\x20actual:\x20'+_0x35f82b['displayName']+'\x20('+_0x35f82b['email']+')':'';var _0x25d12d=_0x35f82b&&_0x35f82b[_0xd974df(0x19c)][0x0]?.[_0xd974df(0x1a8)]==='google.com'&&_0x35f82b[_0xd974df(0x198)]===_0xd974df(0x1c9);_0x2ca50e[_0xd974df(0x1ab)]['display']=_0x25d12d?_0xd974df(0x1dc):_0xd974df(0x194);}}function loginWithGoogle(){var _0x19e57e=_0x3ff9ee,_0x3bc1f=new firebase['auth'][(_0x19e57e(0x1b9))]();firebase[_0x19e57e(0x1de)]()[_0x19e57e(0x1c2)](_0x3bc1f)[_0x19e57e(0x1e5)](function(_0x5d3246){var _0x185b7c=_0x19e57e;alert(_0x185b7c(0x1b8));})[_0x19e57e(0x1ae)](function(_0x1a2b8e){var _0x27845=_0x19e57e;alert('Error\x20al\x20iniciar\x20sesión\x20con\x20Google:\x20'+_0x1a2b8e[_0x27845(0x1c0)]);});}function spinTheWheel(){var _0xf31eb4=_0x3ff9ee,_0x1f6825=[];nameRef[_0xf31eb4(0x1e2)](_0xf31eb4(0x1a2))[_0xf31eb4(0x1e5)](function(_0x19b0cd){var _0x4d2d00=_0xf31eb4;_0x19b0cd[_0x4d2d00(0x1d1)](function(_0x48502a){var _0x4c0269=_0x48502a['val']()['name'];_0x1f6825['push'](_0x4c0269);});if(_0x1f6825['length']>0x0){var _0x5df202=Math['floor'](Math['random']()*_0x1f6825[_0x4d2d00(0x1ce)]),_0x310b44=_0x1f6825[_0x5df202];alert('¡El\x20ganador\x20es:\x20'+_0x310b44+'!');}else alert(_0x4d2d00(0x190));})[_0xf31eb4(0x1ae)](function(_0x5e59c2){var _0x4a280f=_0xf31eb4;console[_0x4a280f(0x18a)](_0x4a280f(0x1aa),_0x5e59c2);});}firebase[_0x3ff9ee(0x1de)]()[_0x3ff9ee(0x1e4)](function(_0x361d4d){var _0x250d72=_0x3ff9ee;displayUserInfo(_0x361d4d);var _0x5d26fd='EcjgireoyRNjZ7Fo3W3eMZT05jp1',_0x7da12f=document['getElementById'](_0x250d72(0x1d5)),_0x1772e0=document[_0x250d72(0x1e1)](_0x250d72(0x1df)),_0x41d831=document['getElementById'](_0x250d72(0x196)),_0x4a87a2=document[_0x250d72(0x1e1)]('logoutButton'),_0x14c003=document['getElementById'](_0x250d72(0x1e7)),_0x2a65ee=document['getElementById'](_0x250d72(0x1ac)),_0x216fa6=document[_0x250d72(0x1e1)](_0x250d72(0x1d4));_0x361d4d?(_0x7da12f[_0x250d72(0x1ab)][_0x250d72(0x1b6)]=_0x250d72(0x194),_0x1772e0[_0x250d72(0x1ab)][_0x250d72(0x1b6)]=_0x250d72(0x194),_0x41d831['style'][_0x250d72(0x1b6)]=_0x250d72(0x194),_0x4a87a2['style'][_0x250d72(0x1b6)]=_0x250d72(0x1dc),_0x361d4d[_0x250d72(0x198)]===_0x5d26fd?(_0x14c003['style'][_0x250d72(0x1b6)]=_0x250d72(0x1dc),_0x2a65ee[_0x250d72(0x1ab)][_0x250d72(0x1b6)]=_0x250d72(0x1dc),_0x216fa6[_0x250d72(0x1ab)][_0x250d72(0x1b6)]=_0x250d72(0x1dc)):(_0x14c003[_0x250d72(0x1ab)][_0x250d72(0x1b6)]='none',_0x2a65ee['style'][_0x250d72(0x1b6)]=_0x250d72(0x194),_0x216fa6[_0x250d72(0x1ab)]['display']='none')):(_0x7da12f[_0x250d72(0x1ab)]['display']='block',_0x1772e0[_0x250d72(0x1ab)]['display']=_0x250d72(0x1dc),_0x41d831[_0x250d72(0x1ab)]['display']='block',_0x4a87a2[_0x250d72(0x1ab)]['display']=_0x250d72(0x194),_0x14c003[_0x250d72(0x1ab)][_0x250d72(0x1b6)]='none',_0x2a65ee[_0x250d72(0x1ab)]['display']=_0x250d72(0x194),_0x216fa6['style'][_0x250d72(0x1b6)]=_0x250d72(0x194));}),document['getElementById']('nameForm')[_0x3ff9ee(0x1a3)]('submit',handleFormSubmission),document['getElementById'](_0x3ff9ee(0x1e7))[_0x3ff9ee(0x1a3)](_0x3ff9ee(0x1bb),resetUserMessages),document[_0x3ff9ee(0x1e1)](_0x3ff9ee(0x1ac))[_0x3ff9ee(0x1a3)](_0x3ff9ee(0x1bb),resetNames),document[_0x3ff9ee(0x1e1)](_0x3ff9ee(0x1d4))['addEventListener'](_0x3ff9ee(0x1bb),resetAllData),document[_0x3ff9ee(0x1e1)]('logoutButton')[_0x3ff9ee(0x1a3)](_0x3ff9ee(0x1bb),logout),document[_0x3ff9ee(0x1e1)](_0x3ff9ee(0x1d5))[_0x3ff9ee(0x1a3)](_0x3ff9ee(0x1bb),loginWithGoogle),document[_0x3ff9ee(0x1e1)](_0x3ff9ee(0x19d))['addEventListener'](_0x3ff9ee(0x1bb),spinTheWheel);
