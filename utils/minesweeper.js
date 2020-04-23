
function search(p,c){
	for(let x = 0; x < c.length; x++){
		if(c[x][0] === p[0] && c[x][1] === p[1]) return true;
	} return false;
}


function main(msg,n){

	let area = [], x = 0; y = 0;
	for(;x < (n+2); x++){
			area[x] = [];
			for(y = 0; y < (n+2); y++){
				if(x === 0 || x === (n+1) || y === 0 || y === (n+1)) area[x][y] = "||:white_large_square:||";
				else area[x][y] = 0;
			}
	}
	let locs = []; x = 0
	while(x < n){
		let loc = [ 1 + Math.floor(Math.random()*n), 1 + Math.floor(Math.random()*n) ];
		if(!search(loc,locs)){
			locs[x] = loc;
			x++;
		}
	} 
	locs.forEach(loc => {
		area[loc[0]][loc[1]] = "||:bomb:||";
	});
	for(x = 1; x < (n+1); x++){
		for(y = 1; y < (n+1); y++){
			if(area[x][y] === "||:bomb:||") continue;
			else{
				if(area[x-1][y-1] === "||:bomb:||") area[x][y]++;
				if(area[x-1][y] === "||:bomb:||") area[x][y]++;
				if(area[x-1][y+1] === "||:bomb:||") area[x][y]++;
				if(area[x][y-1] === "||:bomb:||") area[x][y]++;
				if(area[x][y+1] === "||:bomb:||") area[x][y]++;
				if(area[x+1][y-1] === "||:bomb:||") area[x][y]++;
				if(area[x+1][y] === "||:bomb:||") area[x][y]++;
				if(area[x+1][y+1] === "||:bomb:||") area[x][y]++;
			}
		}
	}
	for(x = 1; x < (n+1); x++){
		for(y = 1; y < (n+1); y++){
			let val = area[x][y];
			switch(val){
				case 0: area[x][y] = "||:zero:||"; break;
				case 1: area[x][y] = "||:one:||"; break;
				case 2: area[x][y] = "||:two:||"; break;
				case 3: area[x][y] = "||:three:||"; break;
				case 4: area[x][y] = "||:four:||"; break;
				case 5: area[x][y] = "||:five:||"; break;
				case 6: area[x][y] = "||:six:||"; break;
				case 7: area[x][y] = "||:seven:||"; break;
				case 8: area[x][y] = "||:eight:||"; break;
			}
		}
	}
	let final = "";
	area.forEach(row => {
		final += row.join(" ");
		final += "\n";
	});
	msg.channel.send(final);
	return new Promise((resolve,reject) => {resolve()});
}
 module.exports = main;

