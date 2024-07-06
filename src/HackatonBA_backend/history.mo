// import Principal "mo:base/Principal";
// import Nat32 "mo:base/Nat32";
// import Text "mo:base/Text";
// import ServiceRegistry "canister:services";

// actor ServiceHistory {
//     type RegistryActor = actor {
//         getAllServices: query () -> async [(Nat32, ServiceRegistry.ServiceInfo)];
//     };

//         public shared query func getServices(canisterId: Principal) : async [(Nat32, ServiceRegistry.ServiceInfo)] {
//         let registry : RegistryActor = actor(bw4dl-smaaa-aaaaa-qaacq-cai);
//         return await registry.getAllServices();
//     };
// };


// // import Principal "mo:base/Principal";
// // import Nat32 "mo:base/Nat32";
// // import Text "mo:base/Text";
// // import ServiceRegistry "canister:ServiceRegistry";

// // actor ServiceHistory {
// //     type RegistryActor = actor {
// //         query func getAllServices() : async [(Nat32, ServiceRegistry.ServiceInfo)];
// //     };

// //     public shared query func getServices(canisterId: Principal) : async [(Nat32, ServiceRegistry.ServiceInfo)] {
// //         let registry : RegistryActor = actor(canisterId);
// //         return await registry.getAllServices();
// //     };
// // };



// // import Canister2 "canister:canister2";

// // actor {
// //     public func main() : async Nat {
// //         return await Canister2.getValue();
// //     };
// // };
