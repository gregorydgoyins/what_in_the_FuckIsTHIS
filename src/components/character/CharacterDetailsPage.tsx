@@ .. @@
         {activeTab === 'powers' && (
           <div className="space-y-6">
             {/* Powers & Abilities Grid */}
             <div>
               <h3 className="text-lg font-semibold text-white mb-4">Powers & Abilities</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {character.powers.map((power, index) => (
                   <div key={index} className="bg-gradient-to-br from-slate-700/70 to-slate-800/70 p-4 rounded-xl border border-slate-600/50 hover:border-indigo-500/50 transition-all group">
                     <div className="flex items-center space-x-3">
                       <Zap className="h-5 w-5 text-yellow-400" />
                       <div>
                         <p className="text-white font-medium">{power}</p>
                         <div className="w-full bg-slate-600/50 rounded-full h-1.5 mt-2">
                           <div 
                             className="bg-yellow-400 h-1.5 rounded-full transition-all duration-500 group-hover:bg-yellow-300"
                             style={{ width: `${75 + Math.random() * 25}%` }}
                           />
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
             
             {/* Power Rating */}
             <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-5 rounded-xl border border-indigo-700/30">
               <h3 className="font-semibold text-white mb-4">Power Assessment</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="text-center">
                   <p className="text-sm text-gray-400 mb-1">Overall Rating</p>
                   <p className="text-2xl font-bold text-white">{character.popularity > 95 ? 'S-Tier' : character.popularity > 90 ? 'A-Tier' : character.popularity > 80 ? 'B-Tier' : 'C-Tier'}</p>
                 </div>
                 <div className="text-center">
                   <p className="text-sm text-gray-400 mb-1">Power Count</p>
                   <p className="text-2xl font-bold text-yellow-400">{character.powers.length}</p>
                 </div>
                 <div className="text-center">
                   <p className="text-sm text-gray-400 mb-1">Threat Level</p>
                   <p className="text-2xl font-bold text-indigo-400">
                     {character.characterType === 'villain' ? 'High' : 
                      character.characterType === 'hero' ? 'Protective' : 
                      'Support'}
                   </p>
                 </div>
               </div>
             </div>
             
             {/* Power Analysis */}
-            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
+            <div className="bg-slate-700/50 p-5 rounded-xl border border-slate-600/50">
               <h3 className="font-semibold text-white mb-3">Power Analysis</h3>
               <p className="text-gray-300 mb-4">
                 {character.name}'s abilities make them a {character.characterType === 'hero' || character.characterType === 'sidekick' ? 'formidable force for good' : 'dangerous adversary'} in the {character.publisher} universe. Their powers are particularly effective against {character.nemesis || 'various opponents'}.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                   <p className="text-sm text-gray-400">Power Level</p>
                   <p className="text-white">{character.popularity > 95 ? 'Omega Level' : character.popularity > 85 ? 'Alpha Level' : 'Beta Level'}</p>
                 </div>
                 <div>
                   <p className="text-sm text-gray-400">Combat Effectiveness</p>
                   <p className="text-white">{character.popularity > 95 ? 'Exceptional' : character.popularity > 85 ? 'High' : 'Moderate'}</p>
                 </div>
                 <div>
                   <p className="text-sm text-gray-400">Versatility</p>
                   <p className="text-white">{character.powers.length > 4 ? 'Highly Versatile' : character.powers.length > 2 ? 'Versatile' : 'Specialized'}</p>
                 </div>
               </div>
             </div>
             
+            {/* Character Relationships in Powers Tab */}
+            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+              {character.nemesis && (
+                <div className="bg-red-900/30 p-4 rounded-lg border border-red-700/30">
+                  <div className="flex items-center space-x-2 mb-2">
+                    <Crosshair className="h-5 w-5 text-red-400" />
+                    <h4 className="font-medium text-white">Greatest Enemy</h4>
+                  </div>
+                  <p className="text-red-200 font-medium">{character.nemesis}</p>
+                  <p className="text-xs text-red-300 mt-1">Powers are often matched against this opponent</p>
+                </div>
+              )}
+              
+              {character.allies && character.allies.length > 0 && (
+                <div className="bg-green-900/30 p-4 rounded-lg border border-green-700/30">
+                  <div className="flex items-center space-x-2 mb-3">
+                    <Users className="h-5 w-5 text-green-400" />
+                    <h4 className="font-medium text-white">Combat Allies</h4>
+                  </div>
+                  <div className="flex flex-wrap gap-2">
+                    {character.allies.slice(0, 4).map((ally, index) => (
+                      <span key={index} className="px-2 py-1 bg-green-900/50 rounded-full text-xs text-green-200 border border-green-700/50">
+                        {ally}
+                      </span>
+                    ))}
+                    {character.allies.length > 4 && (
+                      <span className="px-2 py-1 bg-green-900/50 rounded-full text-xs text-green-300 border border-green-700/50">
+                        +{character.allies.length - 4} more
+                      </span>
+                    )}
+                  </div>
+                </div>
+              )}
+            </div>
+            
             {/* Notable Feats */}
-            <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
+            <div className="bg-indigo-900/30 p-5 rounded-xl border border-indigo-700/30">
               <h3 className="font-semibold text-white mb-3">Notable Feats</h3>
               <ul className="space-y-2 text-gray-300">
                 <li className="flex items-start space-x-2">
                   <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
-                  <span>First appeared in {character.firstAppearance}, quickly becoming a fan favorite</span>
+                  <span>Debuted in {character.firstAppearance}, immediately captivating audiences worldwide</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
-                  <span>Featured in {character.mediaAppearances} media adaptations across film, television, and video games</span>
+                  <span>Starred in {character.mediaAppearances} media adaptations, generating billions in revenue</span>
                 </li>
                 <li className="flex items-start space-x-2">
                   <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
-                  <span>Maintains a {character.popularity}% popularity rating among comic readers and general audiences</span>
+                  <span>Achieved {character.popularity}% popularity rating, ranking among the most beloved characters</span>
+                </li>
+                <li className="flex items-start space-x-2">
+                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
+                  <span>Commands {character.powers.length} distinct powers and abilities in combat scenarios</span>
                 </li>
               </ul>
             </div>
           </div>